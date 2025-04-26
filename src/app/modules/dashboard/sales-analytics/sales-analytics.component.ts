import { MonthlySaleBranchModel } from "./../../../models/monthly-sale-branch.model";
import { PaymentMondelView } from "./../../../models/payment-mode.model";
import { DashboardService } from "src/app/services/dashboard.service";
import { ApiFiletr, ApiMonthFilter } from "src/app/models/api-filetr.model";
import { GemGoldSilverView } from "./../../../models/gem-gold-silver.view";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { GemCmModel } from "src/app/models/gem-cm.model";
import { GoldCmModel } from "src/app/models/gold-cm.model";
import { ChartOptions } from "../product-wise-sale/product-wise-sale.component";
import { TblDashboard, TblDashboardInput } from "../../starter/model/tblDashboard ";

@Component({
  selector: "app-sales-analytics",
  templateUrl: "./sales-analytics.component.html",
  styleUrls: ["./sales-analytics.component.css"],
})
export class SalesAnalyticsComponent implements  OnInit, OnChanges  {
  @Input() thisMonthSales: TblDashboard;
  @Output() dateChange = new EventEmitter<{ month: string; branch: string }>();
  @Input() month = "";
  @Input() branch = "";
  // Sales Analytics Pie chart
  // public pieChartLabels: string[] = ["Gold", "Silver", "Gem", "Total Discount"];
  // public pieChartData: number[] = [this.TotalGold, this.TotalGem, this.TotalDiscount];
  public pieChartType = "pie";
  public lineChartLegend = false;

  finyr = "";

  thisMonth = new Date();
  paymentMondelView: {
    // brcode: string;
    // totalCash: number;
    // // totalGold: number;
    // voucher: number;
    // cardPayment: number;
    // chequePayment: number;
    // paymentUpI: number;
    saleOfMonth?: string;
    brcode?: string;
    cash: number;
    card: number;
    ddChq: number;
    oldGold: number;
    gvoucher: number;
    upi: number;
    finyr?: string;
    branchName:string;
  }[];
  startDate = new Date();
  endDate = new Date();

  // New Chart
  public gold: ChartOptions = {
    series: [],
    colors: ["#7366ff"],
    chart: {
      type: "bar",
      height: 100,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {},
    title: {
      text: "chandan",
      align: "center",
      style: {
        fontSize: "12px",
        color: "black",
      },
    },
  };

  constructor(private dashboardService: DashboardService) {
    this.startDate.setDate(1);
    this.startDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.dashboardService.dashBoardFilter$.subscribe((data) => {
      this.branch = data.branch;
      this.month = data.month;
      this.finyr = data.finyr;
      // this.getThisMonthSales();
      // this.initGraph();
    });
  }

  get TotalUpi() {
    return Array.isArray(this.thisMonthSales.tblSaleAnalysi)
    ? this.thisMonthSales.tblSaleAnalysi.reduce((a, b) => a + b.upi, 0) : 0;
  }
  // get TotalOldGold() {
  //   return this.paymentMondelView.reduce((a, b) => a + b.totalGold, 0);
  // }
  get TotalVoucher() {
     return Array.isArray(this.thisMonthSales.tblSaleAnalysi)
    ? this.thisMonthSales.tblSaleAnalysi.reduce((a, b) => a + b.gvoucher, 0)
    : 0;
  }
  get TotalCash() {
    return Array.isArray(this.thisMonthSales.tblSaleAnalysi)
    ? this.thisMonthSales.tblSaleAnalysi.reduce((a, b) => a + b.cash, 0) : 0;
  }
  get TotalCheque() {
    return Array.isArray(this.thisMonthSales.tblSaleAnalysi)
    ? this.thisMonthSales.tblSaleAnalysi.reduce((a, b) => a + b.ddChq, 0) :0;
  }
  get TotalCard() {
    return Array.isArray(this.thisMonthSales.tblSaleAnalysi)
    ? this.thisMonthSales.tblSaleAnalysi.reduce((a, b) => a + b.card, 0) : 0;
  }

  // getThisMonthSales() {
  //   this.endDate.setHours(11, 59, 59, 0);
  //   let tblDashboardInput=new TblDashboardInput()
  //     tblDashboardInput.month  = this.month.length > 0 ? this.month : null,
  //     tblDashboardInput.branch = this.branch.length > 0 ? this.branch : null,
  //     tblDashboardInput.finyr = this.finyr,
  //   this.dashboardService.getdashborddata(tblDashboardInput).subscribe((data) => {
  //     this.paymentMondelView = data.tblSaleAnalysis;
  //     debugger;
    
  //   });
  
  ngOnChanges(changes: SimpleChanges): void {
    
      this.initGraph(); // safely call only when data exists
    
  }
  initGraph() {
    this.gold = {
      series: [
        {
          name: "Amount",
          data: [
            this.TotalCash,
            this.TotalUpi,
            this.TotalCheque,
            this.TotalCard,
            this.TotalVoucher,
            // this.TotalOldGold,
          ],
        },
      ],
      colors: ["#009efb"],
      chart: {
        type: "bar",
        height: 200,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Cash", "UPI", "Cheque", "Card", "Voucher",],
      },
    };
  }
  get TotalValue() {
    return this.TotalGoldWeght + this.TotalSilverWeght + this.TotalGemSaleCount;
  }

  get TotalGoldWeght() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.tblGoldSale.reduce(
      (a, b) => a + b.goldSale,
      0
    );
  }
  get TotalSilverWeght() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.tblSilverSale.reduce(
      (a, b) => a + b.silverSale,
      0
    );
  }

  get TotalGemSaleCount() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.tblGemSale.reduce((a, b) => a + b.gemSale, 0);
  }

  onDateChange(event) {
    this.branch = event.branch;
    this.month = event.month;
    this.dateChange.emit(event);
    // this.getThisMonthSales();
  }
}

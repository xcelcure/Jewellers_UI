import { MonthlySaleBranchModel } from "./../../../models/monthly-sale-branch.model";
import { PaymentMondelView } from "./../../../models/payment-mode.model";
import { DashboardService } from "src/app/services/dashboard.service";
import { ApiFiletr, ApiMonthFilter } from "src/app/models/api-filetr.model";
import { GemGoldSilverView } from "./../../../models/gem-gold-silver.view";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GemCmModel } from "src/app/models/gem-cm.model";
import { GoldCmModel } from "src/app/models/gold-cm.model";
import { ChartOptions } from "../product-wise-sale/product-wise-sale.component";
import { TblDashboard } from "../../starter/model/tblDashboard ";

@Component({
  selector: "app-sales-analytics",
  templateUrl: "./sales-analytics.component.html",
  styleUrls: ["./sales-analytics.component.css"],
})
export class SalesAnalyticsComponent implements OnInit {
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
    brcode: string;
    totalCash: number;
    // totalGold: number;
    voucher: number;
    cardPayment: number;
    chequePayment: number;
    paymentUpI: number;
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
      this.getThisMonthSales();
      debugger;
    });
  }
  get TotalUpi() {
    return this.paymentMondelView.reduce((a, b) => a + b.paymentUpI, 0);
  }
  // get TotalOldGold() {
  //   return this.paymentMondelView.reduce((a, b) => a + b.totalGold, 0);
  // }
  get TotalVoucher() {
    return this.paymentMondelView.reduce((a, b) => a + b.voucher, 0);
  }
  get TotalCash() {
    return this.paymentMondelView.reduce((a, b) => a + b.totalCash, 0);
  }
  get TotalCheque() {
    return this.paymentMondelView.reduce((a, b) => a + b.chequePayment, 0);
  }
  get TotalCard() {
    return this.paymentMondelView.reduce((a, b) => a + b.cardPayment, 0);
  }

  getThisMonthSales() {
    this.endDate.setHours(11, 59, 59, 0);
    const filetr: ApiMonthFilter = {
      brcode: this.branch.length > 0 ? this.branch : null,
      saleMonth: this.month.length > 0 ? this.month : null,
      finyr: this.finyr,
    };
    this.dashboardService.getPamentDetailsMode(filetr).subscribe((data) => {
      this.paymentMondelView = data;
      debugger;
      this.initGraph();
    });
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
    this.getThisMonthSales();
  }
}

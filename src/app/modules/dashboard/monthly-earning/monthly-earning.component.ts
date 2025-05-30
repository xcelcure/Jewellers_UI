import { ApiFiletr } from "./../../../models/api-filetr.model";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from "ng-apexcharts";
import { TblDashboardInput } from "../../starter/model/tblDashboard ";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: "app-monthly-earning",
  templateUrl: "./monthly-earning.component.html",
  styleUrls: ["./monthly-earning.component.css"],
})
export class MonthlyEarningComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public lineChartColors: Array<any> = [
    {
      // dark grey
      backgroundColor: "rgba(85,206,99,0.0)",
      borderColor: "#55ce63",
      pointBackgroundColor: "#55ce63",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#55ce63",
    },
    {
      // grey
      backgroundColor: "rgba(0,158,251,0.0)",
      borderColor: "#009efb",
      pointBackgroundColor: "#009efb",
      pointBorderColor: "#fff",

      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#009efb",
    },
  ];
  public lineChartLegend = false;
  public lineChartType = "line";
  manthList: number[] = [];
  branch = "";
  constructor(
    private dashboardService: DashboardService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dashboardService.dashBoardFilter$.subscribe((res) => {
      this.branch = res.branch;
      //this.initializeLastFiveMonth(res.finyr, res.branch);
    });

    this.dashboardService.dashbordDataData$.subscribe(data=> {
      const months: string[] = [];
      let month = 1;
      do {
        const date = new Date();
        date.setMonth(date.getMonth() - month);
        // this.lineChartLabels.push(getMonthName(date));
        months.push(getMonthName(date.getMonth()));
        month++;
      } while (month <= 5);

        // set up list for gold
        const goldAmounts: number[] = [];
        const gemAmounts: number[] = [];
        const silverAmounts: number[] = [];
        months.map((month) => {
          // for lolg
          const fonund = Array.isArray(data.tblSaleAnalysi)
          ? data.tblSaleAnalysi.filter((i) => i.saleOfMonth === month)
          : [];
          if (fonund.length > 0) {
            goldAmounts.push(fonund.reduce((a, b) => a + b.card+b.cash+b.ddChq+b.gvoucher+b.upi, 0));
          } else {
            goldAmounts.push(0);
          }
          // gor gem
          const fonund2 = Array.isArray(data.tblSaleAnalysi)
          ? data.tblSaleAnalysi.filter((i) => i.saleOfMonth == month) :[];
          if (fonund2.length > 0) {
            gemAmounts.push(fonund2.reduce((a, b) => a + b.card +b.card +b.ddChq + b.gvoucher +b.upi, 0));
          } else {
            gemAmounts.push(0);
          }

          // gor silver
          const fonund3 = Array.isArray(data.tblSaleAnalysi)
          ? data.tblSaleAnalysi.filter((i) => i.saleOfMonth == month) : [];
          if (fonund3.length > 0) {
            silverAmounts.push(fonund3.reduce((a, b) => a + b.cash+b.card+b.ddChq+b.ddChq+b.gvoucher+b.upi, 0));
          } else {
            silverAmounts.push(0);
          }
        });

        const gold = {
          name: "Gold",
          data: goldAmounts,
        };
        const gem = {
          name: "Gem",
          data: gemAmounts,
        };
        const silver = {
          name: "Silver",
          data: silverAmounts,
        };
        this.initGraph(gold, gem, silver, months);
    })
  }

  //not used this function
  private initializeLastFiveMonth(finyr: string, branch: string): void {
    const months: string[] = [];
    let month = 1;
    do {
      const date = new Date();
      date.setMonth(date.getMonth() - month);
      // this.lineChartLabels.push(getMonthName(date));
      months.push(getMonthName(date.getMonth()));
      month++;
    } while (month <= 5);
   let  tblDashboardInput = new TblDashboardInput
   tblDashboardInput.month = months.length > 0 ? months[0] : null,
   tblDashboardInput.branch = branch.length > 0 ? this.branch : null,
   tblDashboardInput.finyr =  finyr,
    this.dashboardService
      .getdashborddata(tblDashboardInput)
      .subscribe((data) => {
        // set up list for gold
        const goldAmounts: number[] = [];
        const gemAmounts: number[] = [];
        const silverAmounts: number[] = [];
        months.map((month) => {
          // for lolg
          const fonund = data.tblSaleAnalysi.filter((i) => i.saleOfMonth == month);
          if (fonund.length > 0) {
            goldAmounts.push(fonund.reduce((a, b) => a + b.card+b.cash+b.ddChq+b.gvoucher+b.upi, 0));
          } else {
            goldAmounts.push(0);
          }
          // gor gem
          const fonund2 = data.tblSaleAnalysi.filter((i) => i.saleOfMonth == month);
          if (fonund2.length > 0) {
            gemAmounts.push(fonund2.reduce((a, b) => a + b.card +b.card +b.ddChq + b.gvoucher +b.upi, 0));
          } else {
            gemAmounts.push(0);
          }

          // gor silver
          const fonund3 = data.tblSaleAnalysi.filter((i) => i.saleOfMonth == month);
          if (fonund3.length > 0) {
            silverAmounts.push(fonund3.reduce((a, b) => a + b.cash+b.card+b.ddChq+b.ddChq+b.gvoucher+b.upi, 0));
          } else {
            silverAmounts.push(0);
          }
        });

        const gold = {
          name: "Gold",
          data: goldAmounts,
        };
        const gem = {
          name: "Gem",
          data: gemAmounts,
        };
        const silver = {
          name: "Silver",
          data: silverAmounts,
        };
        this.initGraph(gold, gem, silver, months);
      });
  }

  get MonthName() {
    return this.manthList.map((item) => getMonthName(item));
  }

  initGraph(gold: any, gem: any, silver: any, month: any) {
    this.chartOptions = {
      series: [gold, gem, silver],
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        // type: "datetime",
        categories: month,
      },
    };
  }
}

const getMonthName = (number: number): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[number];
};

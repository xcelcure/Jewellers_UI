import { Subscription } from "rxjs";
import { ApiFiletr, ApiMonthFilter } from "./../../../models/api-filetr.model";
import { Component, OnInit, ViewChild } from "@angular/core";
// import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";
import { DashboardService } from "src/app/services/dashboard.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: "app-seles-ration-carat",
  templateUrl: "./seles-ration-carat.component.html",
  styleUrls: ["./seles-ration-carat.component.css"],
})
export class SelesRationCaratComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private dashboardService: DashboardService) {
    this.chartOptions = {
      // series: [44, 55, 13],
      chart: {
        width: 450,
        type: "pie",
      },
      // labels: ["18 Carat", "22 Carat", "24 Carat",],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 500,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }

  series: number[] = [];
  // "18 Carat", "22 Carat", "24 Carat",
  labels: string[] = [];
  month = "";
  branch = "";
  finyr = "";

  subscribe: Subscription;
  ngOnInit() {
    this.subscribe = this.dashboardService.dashBoardFilter$.subscribe(
      (data) => {
        this.month = data.month;
        this.branch = data.branch;
        this.finyr = data.finyr;
        const filetr: ApiMonthFilter = {
          brcode: null,
          saleMonth: data.month.length > 0 ? this.month : null,
          top: 10,
        };
        this.getThisMonthSales();
      }
    );
  }

  getThisMonthSales() {
    const filetr: ApiMonthFilter = {
      saleMonth: this.month.length > 0 ? this.month : null,
      brcode: this.branch.length > 0 ? this.branch : null,
      finyr: this.finyr,
    };

    this.dashboardService.getPurityWiseGoldValue(filetr).subscribe((res) => {
      this.series = res.map((i) => i.totalAmount);
      this.labels = res.map((i) => `${i.purity} Carat`);
    });
  }

  ngOnDestroy(): void {
    this.subscribe && this.subscribe.unsubscribe();
  }
}

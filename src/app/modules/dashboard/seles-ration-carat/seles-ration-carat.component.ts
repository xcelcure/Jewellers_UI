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
import { TblDashboardInput } from "../../starter/model/tblDashboard ";

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
  subscribe1: Subscription;
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
        // this.getThisMonthSales();
      }
    );
    this.subscribe1 = this.dashboardService.dashbordDataData$.subscribe(res=> {
      // group the purity
      //TODO
      const groupedData = Array.from(new Set(res.tblTopSaleProduct.filter(x=> x.purity >0).map(x=>x.purity))).map(purity=>{
        const total  = res.tblTopSaleProduct.filter(c=>c.purity == purity).reduce((a,b)=> a +b.amount, 0);
        return {
          amount: total,
          purity
        }
      })

      this.series = groupedData.map((i) => i.amount);
      this.labels = groupedData.map((i) => `${i.purity} Carat`);
    })
  }

  // not used;
  getThisMonthSales() {
  let tblDashboardInput=new TblDashboardInput()
    tblDashboardInput.month  = this.month.length > 0 ? this.month : null,
    tblDashboardInput.branch = this.branch.length > 0 ? this.branch : null,
    tblDashboardInput.finyr = this.finyr,
    this.dashboardService.getdashborddata(tblDashboardInput).subscribe((res) => {
      this.series = res.tblTopSaleProduct.map((i) => i.amount);
      this.labels = res.tblTopSaleProduct.map((i) => `${i.purity} Carat`);
    });
  }

  ngOnDestroy(): void {
    this.subscribe && this.subscribe.unsubscribe();
    this.subscribe1 && this.subscribe1.unsubscribe();
  }
}

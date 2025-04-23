import { Subscription } from "rxjs";
import { ApiMonthFilter } from "./../../../models/api-filetr.model";
import { ApiFiletr } from "src/app/models/api-filetr.model";
import { Component, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexTheme,
  ApexMarkers,
  ApexAnnotations,
  ApexGrid,
} from "ng-apexcharts";
import { DashboardService } from "src/app/services/dashboard.service";
import { TblDashboardInput } from "../../starter/model/tblDashboard ";

let primary_color = localStorage.getItem("primary_color") || "#7366ff";
let secondary_color = localStorage.getItem("secondary_color") || "#f73164";

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  tooltip?: any;
  dataLabels?: ApexDataLabels;
  yaxis?: ApexYAxis;
  legend?: ApexLegend;
  labels?: string[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
  responsive?: ApexResponsive[];
  pieseries?: ApexNonAxisChartSeries;
  title?: ApexTitleSubtitle;
  theme?: ApexTheme;
  colors?: string[];
  markers?: ApexMarkers;
  annotations?: ApexAnnotations;
  grid?: ApexGrid;
};

@Component({
  selector: "app-product-wise-sale",
  templateUrl: "./product-wise-sale.component.html",
  styleUrls: ["./product-wise-sale.component.css"],
})
export class ProductWiseSaleComponent implements OnInit {
  public gold: ChartOptions = {
    series: [],
    colors: [primary_color],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
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
  public gem: ChartOptions = {
    series: [],
    colors: [secondary_color],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {},
    title: {
      text: "string",
      align: "left",
    },
  };

  month = "";
  branch = "";
  subscribe: Subscription;
  subscribe1: Subscription;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.subscribe = this.dashboardService.dashBoardFilter$.subscribe(
      (data) => {
        this.month = data.month;
        this.branch = data.branch;
        
      }
    );

    this.subscribe1 = this.dashboardService.dashbordDataData$.subscribe(res=> {
    // gems
    
    debugger;
      let gemData = res.tblTopSaleProduct.filter(
        (i) => i.category === "Gem"
      );
      gemData = gemData.sort((a,b)=>b.amount- a.amount ).filter((_, ind)=> ind < 10);
      let categories = gemData.map((i) => i.stk_Gem);
      let values = gemData.map((i) => i.amount);
      // let count = res.map((i) => i.totalcount);

      this.gem = {
        series: [
          {
            name: "Sales Value",
            data: values,
          },
        ],
        colors: [secondary_color],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: categories,
        },
        title: {
          text: "string",
          align: "left",
        },
      };

      // gold

      debugger;

      let goldData = res.tblTopSaleProduct.filter(
        (i) => i.category === "Gold"
      );
      goldData = goldData.sort((a,b)=>b.amount- a.amount ).filter((_, ind)=> ind < 10);
      let goldCategories = goldData.map((i) => i.stk_Gem);
      let goldValues = goldData.map((i) => i.amount);
      this.gold = {
        series: [
          {
            name: "Sales Value",
            data: goldValues,
          },
        ],
        colors: [primary_color],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: goldCategories,
        },
      };

    })
  }

  ngOnDestroy(): void {
    this.subscribe && this.subscribe.unsubscribe();
    this.subscribe1 && this.subscribe1.unsubscribe();
  }
}

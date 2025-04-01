import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TotalCountInformationComponent } from "./total-count-information/total-count-information.component";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartistModule } from "ng-chartist";
import { ChartsModule } from "ng2-charts";
import { ProductWiseSaleComponent } from "./product-wise-sale/product-wise-sale.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { TopBranchComponent } from "./top-branch/top-branch.component";
import { FastMovingProductComponent } from "./fast-moving-product/fast-moving-product.component";
import { MonthlyEarningComponent } from "./monthly-earning/monthly-earning.component";
import { SalesAnalyticsComponent } from "./sales-analytics/sales-analytics.component";
import { SelesRationCaratComponent } from "./seles-ration-carat/seles-ration-carat.component";
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    ChartsModule,
    ChartistModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    RouterModule.forChild([{ path: "", data:{
      title: 'Dashboard',
      showDateChangeMenue: true
    }, component: DashboardComponent }]),
  ],
  declarations: [
    DashboardComponent,
    TotalCountInformationComponent,
    ProductWiseSaleComponent,
    ProductWiseSaleComponent,
    TopBranchComponent,
    FastMovingProductComponent,
    MonthlyEarningComponent,
    SalesAnalyticsComponent,
    SelesRationCaratComponent,
  ],
})
export class DashboardModule {}

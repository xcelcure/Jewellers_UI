import { ApiFiletr, ApiMonthFilter } from "src/app/models/api-filetr.model";
import { DashboardService } from "src/app/services/dashboard.service";
import { TopSalesBranchModel } from "./../../../models/top-sale-branch.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { Subscription } from "rxjs";

@Component({
  selector: "app-top-branch",
  templateUrl: "./top-branch.component.html",
  styleUrls: ["./top-branch.component.css"],
})
export class TopBranchComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};

  topSalesBranchModel: {
    branchName: string;
    brcode: string;
    saleMonth: string;
    silverSale: number;
    goldSale: number;
    gemSale: number;
    totalSale: number;
  }[] = [];
  startDate = new Date();
  endDate = new Date();
  month = "";
  subscribe: Subscription;
  constructor(private DashboardService: DashboardService) {
    this.startDate.setDate(1);
    this.startDate.setMonth(this.startDate.getMonth() - 2);
  }

  ngOnInit() {
    this.subscribe = this.DashboardService.dashBoardFilter$.subscribe(
      (data) => {
        this.month = data.month;
        
        const filetr: ApiMonthFilter = {
          brcode: null,
          saleMonth: data.month.length > 0 ? this.month : null,
          top: 10,
          finyr:data.finyr
        };
        this.DashboardService.getGetTopSaleBranch(filetr).subscribe((data) => {
          this.topSalesBranchModel = data;
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscribe && this.subscribe.unsubscribe();
  }
}

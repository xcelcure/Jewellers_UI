import { ApiFiletr, ApiMonthFilter } from "src/app/models/api-filetr.model";
import { DashboardService } from "src/app/services/dashboard.service";
import { TopSalesBranchModel } from "./../../../models/top-sale-branch.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { Subscription } from "rxjs";
import {
  TblDashboard,
  TblDashboardInput,
} from "../../starter/model/tblDashboard ";

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
  TblDashboard: TblDashboard;
  subscribe: Subscription;
  subscribe1: Subscription;
  constructor(private DashboardService: DashboardService) {
    this.startDate.setDate(1);
    this.startDate.setMonth(this.startDate.getMonth() - 2);
  }

  ngOnInit() {
    debugger
    this.subscribe = this.DashboardService.dashBoardFilter$.subscribe(
      (data) => {
        this.month = data.month;

        // const filetr: ApiMonthFilter = {
        //   brcode: null,
        //   saleMonth: data.month.length > 0 ? this.month : null,
        //   top: 10,
        //   finyr:data.finyr
        // };


        // let tblDashboardInput = new TblDashboardInput();
        // (tblDashboardInput.month = data.month.length > 0 ? this.month : null),
        //   (tblDashboardInput.branch = null),
        //   (tblDashboardInput.finyr = data.finyr),
        //   this.DashboardService.getdashborddata(tblDashboardInput).subscribe(
        //     (data) => {
        //       this.TblDashboard = data;
        //     }
        //   );
      }
    );
    this.subscribe1 = this.DashboardService.dashbordDataData$.subscribe(data=> {
      this.TblDashboard = data;
    })

  }

  get total(): number {
    debugger
    if (!this.TblDashboard.tblSaleAnalysi) return 0;

    return this.TblDashboard.tblSaleAnalysi.reduce((sum, sale) => {
      return (
        sum +
        (sale.cash || 0) +
        (sale.card || 0) +
        (sale.upi || 0) +
        (sale.gvoucher || 0) +
        (sale.ddChq || 0)
      );
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscribe && this.subscribe.unsubscribe();
  }
}

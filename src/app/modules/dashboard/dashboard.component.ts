import { MonthlySaleBranchModel } from "./../../models/monthly-sale-branch.model";
import { Subscription } from "rxjs";
import { GemGoldSilverView } from "./../../models/gem-gold-silver.view";
import { GoldCmModel } from "./../../models/gold-cm.model";
import { ApiFiletr, ApiMonthFilter } from "./../../models/api-filetr.model";
import { GemCmModel } from "./../../models/gem-cm.model";
import { Component } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";
import { LoginService } from "src/app/authentication/login/service/login.service";
import { TblDashboard, TblDashboardInput } from "../starter/model/tblDashboard ";

@Component({
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  thisMonthSales = new GemGoldSilverView();
  TblDashboard:TblDashboard;
  saleInfo: MonthlySaleBranchModel;
  startDate = new Date();
  endDate = new Date();
  month = "";
  branch = "";
  finyr = "";
  subscribe: Subscription;
  currentUser: any;
  constructor(
    private dashboardService: DashboardService,
    private loginService: LoginService
  ) {
    this.startDate.setDate(1);
    // startDate.setMonth(startDate.getMonth() -2);
    this.startDate.setHours(0, 0, 0, 0);
    this.dashboardService.getAllBranchs();
  }

  // ngOnInit() {
  //   this.subscribe = this.dashboardService.dashBoardFilter$.subscribe(
  //     (data) => {
  //       this.branch = data.branch;
  //       this.month = data.month;
  //       this.finyr = data.finyr;
  //       this.getThisMonthSales();
  //       this.getdashborddata();
  //     }
  //   );
  //   this.loginService.user$.subscribe((user) => {
  //     this.currentUser = user;
  //   });
  // }

  ngOnInit() {
    this.loginService.user$.subscribe((user) => {
      this.currentUser = user;
  
      this.subscribe = this.dashboardService.dashBoardFilter$.subscribe(
        (data) => {
          this.branch = data.branch;
          this.month = data.month;
          this.finyr = data.finyr;
  
          // this.getThisMonthSales();
          this.getdashborddata();
        }
      );
    });
  }
  

  // getThisMonthSales() {
  //   this.endDate.setHours(11, 59, 59, 0);
  //   const filetr: ApiMonthFilter = {
  //     saleMonth: this.month.length > 0 ? this.month : null,
  //     brcode: this.branch.length > 0 ? this.branch : null,
  //     finyr: this.finyr,
  //   };
  //   this.dashboardService
  //     .getMonthWiseGemGoldSilverReport(filetr)
  //     .subscribe((data) => {
  //       this.saleInfo = data;
  //     });
  // }
  getdashborddata() {
    let tblDashboardInput=new TblDashboardInput()
    this.endDate.setHours(11, 59, 59, 0);
  
      tblDashboardInput.month  = this.month.length > 0 ? this.month : null,
      tblDashboardInput.branch = this.branch.length > 0 ? this.branch : null,
      tblDashboardInput.finyr = this.finyr,
    
    this.dashboardService
      .getdashborddata(tblDashboardInput)
      .subscribe((data) => {
        this.TblDashboard = data;
      });
  }
  // onDateChange(event) {
  //   this.dashboardService.dashBoardFilter$.next({
  //     month: event.month,
  //     branch: event.branch,
  //   });
  // }

  ngOnDestroy() {
    this.subscribe && this.subscribe.unsubscribe();
  }
}

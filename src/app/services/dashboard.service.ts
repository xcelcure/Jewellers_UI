import { BranchViewModel } from "./../modules/starter/model/branchModel";
import { DailynotesService } from "./../modules/dailynotes/dailynotes.service";
import { MonthWiseReport } from "./../models/month-wise-report.model";
import { PurityWiseGoldSales } from "./../models/purity-wise-gold-sales.model";
import { Injectable } from "@angular/core";
import { GoldCmModel } from "./../models/gold-cm.model";
import { ApiFiletr, ApiMonthFilter } from "./../models/api-filetr.model";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GemCmModel } from "../models/gem-cm.model";
import { BehaviorSubject, Subject } from "rxjs";
import { MonthlySaleBranchModel } from "../models/monthly-sale-branch.model";
import { TblDashboardInput, TblDashboard } from "../modules/starter/model/tblDashboard ";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export const MONTHS_NAME = [
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

export interface Branch {
  brName: string;
  brCode: string;
}

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  apiUrl: string = environment.apiURL;

  allBranch$ = new BehaviorSubject<Branch[]>([]);

  dashBoardFilter$ = new Subject<{
    branch: string;
    month: string;
    finyr?: string;
  }>();

  dashbordDataData$ = new Subject<TblDashboard>();

  constructor(
    private http: HttpClient,
    private dailynotesService: DailynotesService
  ) {
  }

  getGoldSales(filetr: ApiFiletr) {
    return this.http.post<GoldCmModel[]>(
      this.apiUrl + "api/GemCmReport/GoldReport",
      filetr
    );
  }
  getGemSales(filetr: ApiFiletr) {
    return this.http.post<GemCmModel[]>(
      this.apiUrl + "api/GemCmReport/GemReport",
      filetr
    );
  }

  getGoldSalesDetails(filetr: ApiFiletr) {
    return this.http.post<PurityWiseGoldSales[]>(
      this.apiUrl + "api/PrityWiseGoldSales/GetAllPurityWiseGoldSales",
      filetr
    );
  }

  getTopGoldSale(filetr: ApiMonthFilter) {
    return this.http.post<
      {
        brcode: string;
        category: string;
        stk_Gem: string;
        amount: 0;
      }[]
    >(this.apiUrl + "api/MonthlyTopSales/TopMonthlyGoldSal", filetr);
  }
  getTopGemSale(filetr: ApiMonthFilter) {
    return this.http.post<
      {
        brcode: string;
        category: string;
        stk_Gem: string;
        amount: 0;
      }[]
    >(this.apiUrl + "api/MonthlyTopSales/TopMonthlmGemSale", filetr);
  }

  getPurityWiseGoldValue(filetr: ApiMonthFilter) {
    return this.http.post<
      {
        brcode: string;
        purity: number;
        totalAmount: number;
      }[]
    >(this.apiUrl + "api/MonthlyTopSales/MonthlyPuritySale", filetr);
  }

  getMonthWiseGoldReport(filetr: ApiFiletr) {
    return this.http.post<MonthWiseReport[]>(
      this.apiUrl + "api/MonthWiseGemCM/MonthGoldCmReport",
      filetr
    );
  }
  getMonthWiseGemReport(filetr: ApiFiletr) {
    return this.http.post<MonthWiseReport[]>(
      this.apiUrl + "api/MonthWiseGemCM/MonthGemCmReport",
      filetr
    );
  }

  getMonthWiseGemGoldSilverReport(filetr: ApiMonthFilter) {
    return this.http.post<MonthlySaleBranchModel>(
      this.apiUrl + "api/TopBranchSales/MonthlySales",
      filetr
    );
  }
  getPamentDetailsMode(filetr: ApiMonthFilter) {
    return this.http.post<
      {
        brcode: string;
        totalCash: number;
        // totalGold: number;
        voucher: number;
        cardPayment: number;
        chequePayment: number;
        paymentUpI: number;
      }[]
    >(this.apiUrl + "api/TopBranchSales/SalesAnalysis", filetr);
  }

  getGetTopSaleBranch(filetr: ApiMonthFilter) {
    return this.http.post<
      {
        branchName: string;
        brcode: string;
        saleMonth: string;
        silverSale: number;
        goldSale: number;
        gemSale: number;
        totalSale: number;
      }[]
    >(this.apiUrl + "api/TopBranchSales/BranchSale", filetr);
  }

  getAllBranchs() {
    let branchViewModel = new BranchViewModel();
    this.dailynotesService.getAllBarnch(branchViewModel).subscribe((res) => {
      if (res) {
        const branches: Branch[] = [];
        res.branchModelList.map((branch) => {
          branches.push({
            brName: branch.branchName,
            brCode: branch.brcode,
          });
        });
        this.allBranch$.next(branches);
        // console.log(this.branchListViewModel)
      }
    });
  }

  getSaleeAmount(months: string[], finyr: string, branch: string) {
    return this.http.post<{
      gemSales: {
        saleMonth: string;
        gemsale: number;
      }[];
      goldSales: {
        saleMonth: string;
        goldsale: number;
      }[];
      silverSales: {
        saleMonth: string;
        silversale: number;
      }[];
    }>(this.apiUrl + "api/AllSalesMonth/ListMonth", {
      month: months,
      finyr,
      branch: branch.length ? branch : null,
    });
  }

  getAllFinYars() {
    return this.http.get<{
      listTbl: {
        finYr: string;
        dtFrom: string;
        dtTo: string;
      }[];
    }>(this.apiUrl + "api/MonthlyTopSales/GetAllFinyr");
  }


   getdashborddata( tblDashboardInput: TblDashboardInput ) {
     const url = this.apiUrl+"api/SalesReportContoller/GetDashboardData";
     return this.http.post<TblDashboard>(url,tblDashboardInput,httpOptions);
   }
}

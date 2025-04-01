import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class GemCMTime {
    public totalrecords: number;
    public pageNumber: number;
    public pageSize: number;
    public message?: string;
    public failure: boolean;
    public username?: string;
    public token?: string;
    public user_type?: string;
    public fromDate: Date;
    public toDate: Date;
    public branch?: string;
    public finyr?: string;
    public top?: number;
  
    constructor() {
      this.totalrecords = 0;
      this.pageNumber = 1;
      this.pageSize = 10;
      this.message = '';
      this.failure = false;
      this.username = '';
      this.token = '';
      this.user_type = '';
      this.fromDate = new Date();
      this.toDate = new Date();
      this.branch = '';
      this.finyr = '';
      this.top = 0;
    }
  }
  export class MonthlyBalanceReportViewModel extends CommonModel {
    barCode: string;
    fromDate: Date;
    toDate: Date;
    branch: string;
    finyr:string;
    date: string;
    oP_Bullion: number;
    oP_OG: number;
    oP_OG24: number;
    oP_18K: number;
    oP_22K: number;
    oP_24K: number;
    pur_Bullion: number;
    puR_OG_0: number;
    puR_OG_18: number;
    puR_OG_22: number;
    puR_OG_24: number;
    issuE_Buliion: number;
    issuE_OG_24: number;
    issuE_18K: number;
    issuE_22K: number;
    issuE_24K: number;
    issuE_TO_SLG_OG: number;
    issuE_TO_SLG_18K: number;
    issuE_TO_SLG_22K: number;
    issuE_TO_SLG_24K: number;
    constructor() {
        super();
      }
  }
  
 
  export class MonthlyBalanceReportListViewModel extends CommonModel {
  
    listMonthlyBalance?: MonthlyBalanceReportViewModel[];
    
    constructor() {
        super();
        this.listMonthlyBalance = [];
      }
  }
  
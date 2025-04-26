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

export class DailyCashCollectionViewModel extends CommonModel {
    saleDate?: string; // Nullable string
    voucherType?: string; // Nullable string
    voucherNo?: string; // Nullable string
    cash: number; // Double
    card: string; // Nullable string
    rtgs_chq?: string; // Nullable string
    upi: number; // Double
    customer: number; // Double
    totalAmount: number; // Double
    brCode: string;
    fromDate: Date;
    toDate: Date;
    finyr:string;
    branch:string ;
    constructor() {
        super();
       
    }
}
  
  
  export class DailyCashCollectionListViewModel extends CommonModel{

    listDailyCash?: DailyCashCollectionViewModel[]; 
    constructor() {
        super();
        this.listDailyCash = [];
      }
  }
  
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
      this.pageNumber = 1;
      this.pageSize = 10;
      this.username = '';
      this.token = '';
      this.fromDate = new Date(); // Format as ISO 8601 string
      this.branch = '';
      this.finyr = '';
    }
  }
  export class BranchStockViewModel extends CommonModel {
    fromDate: Date;
    toDate: Date;
    branch: string;
    finyr?: string;
    stockDate: Date;
    brCode?: string;
    fG_24K: number;
    fG_22K: number;
    fG_18K: number;
    oR_24K: number;
    oR_22K: number;
    oR_18K: number;
    oR_0K: number;
    fS_0K: number;
    fS_925K: number;
    fS_85K: number;
    fS_70K: number;
    rS_0K: number;
    constructor() {
    super()
    }
  }
  export class BranchStockListViewModel extends CommonModel {
    listStock:BranchStockViewModel[];
    constructor() {
        super()
        this.listStock=[];

        }
  }
  
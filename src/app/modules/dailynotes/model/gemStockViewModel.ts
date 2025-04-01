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

export class GemStockViewModel extends CommonModel {
  fromDate: Date;
  toDate: Date;
  branch: string;
  finyr?: string;
  public brcode?: string;
  public gemCode?: string;
  public variant?: string;
  public balance: number;
  public rowId: number;
  public gemCMTime: GemCMTime

  constructor() {
    super()
    this.gemCMTime;
  }
}

export class GemStockListViewModel extends CommonModel {

  public listGemStock?: GemStockViewModel[];

  constructor() {
    super();

    this.listGemStock = [];
  }
}

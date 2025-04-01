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
export class MonthlyProductSaleViewModel extends CommonModel {
  fromDate: Date;
  toDate: Date;
  branch: string;
  finyr?: string;
  barCode: string ;
  cmDate: Date;
  cmNo?: string | null;
  description?: string | null;
  custName?: string | null;
  phoneNo?: string | null;
  grossWt: number;
  netWt: number;
  gemwt: number;
  taxableValue: number;
  constructor() {
    super();
  }
}


export class MonthlyProductSaleListViewModel extends CommonModel {

  listProduct?: MonthlyProductSaleViewModel[];
  constructor() {
    super();
    this.listProduct = [];
  }
}

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

export class CustomerDataviewModel extends CommonModel {

  public salesReportModel: GemCMTime;
  barCode: string;
  fromDate: Date;
  toDate: Date;
  branch: string;

  custName: string

  custAddress: string

  phoneNo: string
  product: string

  taxableAmt: number
  gstAmt: number
  amount: number
  dob: string

  constructor() {
    super();
    this.salesReportModel;
  }

}

export class CustomerDataviewListModel extends CommonModel {

  public listCoustomerData?: CustomerDataviewModel[];

  constructor() {
    super()
    this.listCoustomerData = [];
  }
}


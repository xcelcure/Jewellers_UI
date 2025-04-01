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
export class MonthlySchemeMaturityViewModel  extends CommonModel {
    fromDate: Date;
    toDate: Date;
    branch: string;
    finyr?: string;
    barCode: string ;
    memberNo?: string | null;
    memberName?: string | null;
    phoneNo?: string | null;
    startDate?: string | null; // ISO 8601 date string
    maturityDate?: string | null; // ISO 8601 date string
    amount: number;
    instPaid: number;
    accumGold: number;
    status?: string | null;
    cmNo?: string | null;
    cmDate?: string | null; // ISO 8601 date string
    taxableAmt: number;
    constructor() {
        super();
      }
  }
export class MonthlySchemeMaturityListViewModel  extends CommonModel {

  listMaturity?: MonthlySchemeMaturityViewModel[] ;
  constructor() {
    super();
    this.listMaturity = [];
  }

}
  
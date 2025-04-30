import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class DailyNoteInput extends CommonModel  {
    totalrecords: number;
    pageNumber: number;
    pageSize: number;
    message: string | null;
    failure: boolean;
    username: string | null;
    token: string | null;
    user_type: string | null;
    branchCode: string ;
    date: Date; 
    financialYear: string | null;
  }

export class DailyNote extends CommonModel  {
    brcode?: string | null;
    cmdate: string; 
    memono?: string | null;
    vno?: string | null;
    cash: number;
    dd: number;
    cc: number;
    customer: number;
    gv: number;
    upi: number;
    description?: string | null;
    totalamount: number;
    vno_credit: number;
    description_credit?: string | null;
    cash_credit: number;
    chq_credit: number;
    totamount_credit: number;
    rowID: number;
  }
  
  export class DailyNoteOutput extends CommonModel {
    totalrecords: number;
    pageNumber: number;
    pageSize: number;
    message: string | null;
    failure: boolean;
    username: string | null;
    token: string | null;
    user_type: string | null;
    listDailyNote: DailyNote[] | null;
    constructor() {
      super();
      this.listDailyNote = [];
    }
  }
  
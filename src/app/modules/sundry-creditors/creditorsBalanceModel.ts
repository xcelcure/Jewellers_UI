import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class CreditorsBalanceInputModel  extends CommonModel {
    totalrecords: number;
    pageNumber: number;
    pageSize: number;
    message: string | null;
    failure: boolean;
    username: string | null;
    token: string | null;
    user_type: string | null;
    finyr: string | null;
    fromDate: Date ;
    toDate: Date ;
  }
  
export class CreditorsBalanceModel  extends CommonModel {
    supID?: string | null;
    supName?: string | null;
    slid?: string | null;
    creditorsBalance: number;
  }
  
  export class CreditorsBalanceLVModel extends CommonModel {
    totalrecords: number;
    pageNumber: number;
    pageSize: number;
    message: string | null;
    failure: boolean;
    username: string | null;
    token: string | null;
    user_type: string | null;
    creditorsBalanceModels?: CreditorsBalanceModel[] | null;
    constructor() {
        super();
        this.creditorsBalanceModels = [];
      }
  }
  
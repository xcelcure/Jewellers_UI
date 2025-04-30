import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class SmithSummaryInput  extends CommonModel {
    totalrecords: number;
    pageNumber: number;
    pageSize: number;
    message: string | null;
    failure: boolean;
    username: string | null;
    token: string | null;
    user_type: string | null;
    fromDate: Date; // ISO date-time format (e.g., '2025-04-30T00:00:00Z')
    toDate: Date;   // ISO date-time format
    branchCode?: string | null;
  }

export class SmithSummary extends CommonModel  {
    smithid?: string | null;
    smithname?: string | null;
    smithStatus?: string | null;
    smithaddress?: string | null;
  
    opbaL_18: number;
    issued_18: number;
    receipt_18: number;
    mfLoss_18: number;
    closing_18: number;
  
    opbaL_22: number;
    issued_22: number;
    receipt_22: number;
    mfLoss_22: number;
    closing_22: number;
  
    opbaL_24: number;
    issued_24: number;
    receipt_24: number;
    mfLoss_24: number;
    closing_24: number;
  
    silver_OPBAL: number;
    silver_Issued: number;
    silver_Receipt: number;
    silver_Closing: number;
  }
  
  export class SmithSummaryOutput  extends CommonModel  {
    totalrecords: number;
    pageNumber: number;
    pageSize: number;
    message: string | null;
    failure: boolean;
    username: string | null;
    token: string | null;
    user_type: string | null;
    listSmithSummaries?: SmithSummary[] | null;
    constructor() {
      super();
      this.listSmithSummaries = [];
    }
  }
  
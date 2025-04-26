import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class TblDashboardInput extends CommonModel {
   
    username: string;
    token: string;
    branch: string;
    finyr: string;
    month: string;
 
  }
  

export class TblGoldSale extends CommonModel {
  id: number;
  saleOfMonth?: string;
  brcode?: string;
  goldSale: number;
  finyr?: string;
}

export class TblGemSale extends CommonModel {
  id: number;
  saleOfMonth?: string;
  brcode?: string;
  gemSale: number;
  finyr?: string;
}

export class TblSilverSale extends CommonModel {
  id: number;
  saleOfMonth?: string;
  brcode?: string;
  silverSale: number;
  finyr?: string;
}

export class TblTopSaleProduct extends CommonModel {
  saleOfMonth?: string;
  brcode?: string;
  category?: string;
  stk_Gem?: string;
  purity: number;
  amount: number;
  finyr?: string;
}

export class TblSaleAnalysis extends CommonModel {
  saleOfMonth?: string;
  brcode?: string;
  cash: number;
  card: number;
  ddChq: number;
  oldGold: number;
  gvoucher: number;
  upi: number;
  finyr?: string;
  branchName:string;
}

export class TblDashboard extends CommonModel {
    totalrecords: number;
    pageNumber: number;
    pageSize: number;
    message: string; 
    failure: boolean;
    username: string;
    token: string;
    user_type: string;
    tblGoldSale?: TblGoldSale[];
    tblGemSale?: TblGemSale[];
    tblSilverSale?: TblSilverSale[];
    tblTopSaleProduct?: TblTopSaleProduct[];
    tblSaleAnalysi?: TblSaleAnalysis[];
  
    constructor() {
      super();
      this.tblGoldSale = [];
      this.tblGemSale = [];
      this.tblSilverSale = [];
      this.tblTopSaleProduct = [];
      this.tblSaleAnalysi = [];
    }
  }
  

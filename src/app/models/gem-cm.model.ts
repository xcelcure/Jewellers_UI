export interface GemCmModel {
  brCode: string;

  cmNo: string;

  cmDate: Date;
  appNo: string;

  orderNo: string;

  memberNo: string;

  custName: string;

  address: string;

  taxableAmt: number;
  discount: number;
  sgst: number;
  cgst: number;
  igst: number;
  exCharge: number;
  deposit: number;
  mrid: string;

  cashAmt: number;
  dD_Chq: string;

  cCard: string;

  gvoucher: string;

  status: string;

  customer: number;
  state: string;

  sync_Status: number;
  sync_Date: Date;
  rowId: number;
  gstno: string;

  discRef: string;

  phoneNo: string;

  pan: string;

  upi: number;
  tcs: number;
  pin: number;
  location: string;

  buyerPOS: string;

  buyerState: string;
}

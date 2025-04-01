export interface PaymentMode {
  cashAmt: number;
  dD_Chq: string;
  cCard: string;
  gvoucher: number;
  customer: number;
  upi: number;
}

export class PaymentMondelView {
    gemCashVoucher:PaymentMode[] = [];
    goldCashVoucher:PaymentMode[] = [];
    silverCashVoucher:PaymentMode[] = [];
}
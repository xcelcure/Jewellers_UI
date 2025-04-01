export interface MonthlySaleBranchModel {
  goldSale: {
    brcode: string;
    saleMonth: string;
    totalGoldSale: number;
  }[];
  gemSale: {
    brcode: string;
    saleMonth: string;
    totalGemSale: number;
  }[];
  silverSale: {
    brcode: string;
    saleMonth: string;
    totalSilverSale: number;
  }[];
}

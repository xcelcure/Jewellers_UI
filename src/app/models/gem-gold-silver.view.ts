export interface GemRatioModel {
  month: string;
  totalCount: number;
  totalGemRate: number;
  totalGemAmt: number;
  totalGemDiscount: number;
}

export interface GoldRatioModel {
  month: string;
  totalWt: number;
  totalGoldRate: number;
  totalGoldAmt: number;
  totalGoldDiscount: number;
}
export interface SilverRatioModel {
  month: string;
  totalSilverWt: number;
  totalSilverDiscount: number;
  totalcharge: number;
}

export class GemGoldSilverView {
    gemRasio:GemRatioModel[] =[];
    goldRasio:GoldRatioModel[] =[];
    silverRasio:SilverRatioModel[] =[];
    gemGoldRasio:GemRatioModel[] =[];
    gemSilverRasio:GemRatioModel[] =[];
}

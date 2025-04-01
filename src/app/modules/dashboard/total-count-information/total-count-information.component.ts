import { MonthlySaleBranchModel } from "./../../../models/monthly-sale-branch.model";
import { GemGoldSilverView } from "./../../../models/gem-gold-silver.view";
import { Component, Input } from "@angular/core";
@Component({
  selector: "app-total-count-information",
  templateUrl: "./total-count-information.component.html",
})
export class TotalCountInformationComponent {
  @Input() thisMonthSales: MonthlySaleBranchModel;
  @Input() month = "";
  @Input() branch = "";
  get TotalValue() {
    return this.TotalGoldWeght + this.TotalSilverWeght + this.TotalGemSaleCount;
  }

  get TotalGoldWeght() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.goldSale.reduce(
      (a, b) => a + b.totalGoldSale,
      0
    );
  }
  get TotalSilverWeght() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.silverSale.reduce(
      (a, b) => a + b.totalSilverSale,
      0
    );
  }

  get TotalGemSaleCount() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.gemSale.reduce((a, b) => a + b.totalGemSale, 0);
  }
}

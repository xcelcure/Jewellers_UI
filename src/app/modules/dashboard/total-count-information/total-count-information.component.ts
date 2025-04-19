import { MonthlySaleBranchModel } from "./../../../models/monthly-sale-branch.model";
import { GemGoldSilverView } from "./../../../models/gem-gold-silver.view";
import { Component, Input } from "@angular/core";
import { TblDashboard } from "../../starter/model/tblDashboard ";
@Component({
  selector: "app-total-count-information",
  templateUrl: "./total-count-information.component.html",
})
export class TotalCountInformationComponent {
  @Input() thisMonthSales: TblDashboard;
  @Input() month = "";
  @Input() branch = "";
  get TotalValue() {
    return this.TotalGoldWeght + this.TotalSilverWeght + this.TotalGemSaleCount;
  }

  get TotalGoldWeght() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.tblGoldSale.reduce(
      (a, b) => a + b.goldSale,
      0
    );
  }
  get TotalSilverWeght() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.tblSilverSale.reduce(
      (a, b) => a + b.silverSale,
      0
    );
  }

  get TotalGemSaleCount() {
    if (!this.thisMonthSales) return 0;
    return this.thisMonthSales.tblGemSale.reduce((a, b) => a + b.gemSale, 0);
  }
}

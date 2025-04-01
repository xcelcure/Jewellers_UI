import { SalesAnalysisComponent } from "./sales-analysis.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: "",
        component: SalesAnalysisComponent,
        children: [
          { path: "", redirectTo: "gold", pathMatch: "full" },
          {
            path: "gold",
            loadChildren: () =>
              import("./gold-sales/gold-sales.module").then(
                (m) => m.GoldSalesModule
              ),
          },
          {
            path: "gem",
            loadChildren: () =>
              import("./gem-sales/gem-sales.module").then(
                (m) => m.GemSalesModule
              ),
          },
        ],
      },
    ]),
  ],
  declarations: [SalesAnalysisComponent],
})
export class SalesAnalysisModule {}

import { GoldSalesComponent } from "./gold-sales.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: "",
        component: GoldSalesComponent,
        data: {
          title: "Branch-wise Gold Sales",
          urls: [
            { title: "Repotrs", url: "/" },
            { title: "Branch-wise Gold Sales" },
          ],
        },
      },
    ]),
  ],
  declarations: [GoldSalesComponent],
})
export class GoldSalesModule {}

import { GemSalesComponent } from "./gem-sales.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: GemSalesComponent,
        data: {
          title: "Branch-wise Gem Sales",
          urls: [
            { title: "Repotrs", url: "/" },
            { title: "Branch-wise Gem Sales" },
          ],
        },
      },
    ]),
  ],
  declarations: [GemSalesComponent],
})
export class GemSalesModule {}

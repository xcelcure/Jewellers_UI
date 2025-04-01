import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { settingsComponent } from "./settings.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    // data: {
    //   title: "Settings",
    //   urls: [{ title: "Settings" }],
    // },
    component: settingsComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [],
  declarations: [settingsComponent],
})
export class SettingsModule {}

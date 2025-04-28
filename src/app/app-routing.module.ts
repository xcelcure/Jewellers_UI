import { AuthguardService } from "./shared/authguardservice/authguard.service";
import { Routes } from "@angular/router";
import { BlankComponent } from "./layouts/blank/blank.component";
import { FullComponent } from "./layouts/full/full.component";
import { SettingGuard } from "./settings/setting.guard";


export const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    canActivate: [AuthguardService],
    canActivateChild: [AuthguardService],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "starter",
        loadChildren: () =>
          import("./modules/starter/starter.module").then(
            (m) => m.StarterModule
          ),
      },
      {
        path: "customerdata",
        loadChildren: () =>
          import("./modules/customer-data/customer-data.module").then(
            (m) => m.CustomerDataModule
          ),
      },
      {
        path: "gemsalesreport",
        loadChildren: () =>
          import("./modules/dailynotes/dailynotes.module").then(
            (m) => m.DailynotesModule
          ),
      },

      {
        path: "fundPosition",
        loadChildren: () =>
          import("./modules/front-position/front-position.module").then(
            (m) => m.FrontPositionModule
          ),
      },
      {
        path: "cashBank",
        loadChildren: () =>
          import("./modules/cash-bank/cash-bank.module").then(
            (m) => m.CashBankModule
          ),
      },

      {
        path: "branchStockReport",
        loadChildren: () =>
          import("./modules/branch-stock/branch-stock.module").then(
            (m) => m.BranchStockModule
          ),
      },
      {
        path: "monthlyBalanceReport",
        loadChildren: () =>
          import("./modules/monthly-balance-report/monthly-balance-report.module").then(
            (m) => m.MonthlyBalanceReportModule
          ),
      },
      {
        path: "dailyCashCollection",
        loadChildren: () =>
          import("./modules/daily-cash-collection/daily-cash-collection.module").then(
            (m) => m.DailyCashCollectionModule
          ),
      },
      {
        path: "monthlySchemeMaturity",
        loadChildren: () =>
          import("./modules/monthly-scheme-maturity/monthly-scheme-maturity.module").then(
            (m) => m.MonthlySchemeMaturityModule
          ),
      },
      
      {
        path: "oldGold",
        loadChildren: () =>
          import("./modules/old-glod/old-glod.module").then(
            (m) => m.OldGlodModule
          ),
      },
      
      {
        path: "metalBalance",
        loadChildren: () =>
          import("./modules/metal-balance/metal-balance.module").then(
            (m) => m.MetalBalanceModule
          ),
      },
      {
        path: "monthlyProductSaleModule",
        loadChildren: () =>
          import("./modules/monthly-product-sale/monthly-product-sale.module").then(
            (m) => m.MonthlyProductSaleModule
          ),
      },

      
      
      {
        path: "settings",
        canActivate: [SettingGuard],
        loadChildren: () =>
          import("./settings/settings.module").then((m) => m.SettingsModule),
      },
      {
        path: "sale-analytics",
        loadChildren: () =>
          import("./modules/sales-analysis/sales-analysis.module").then(
            (m) => m.SalesAnalysisModule
          ),
      },
    ],
  },
  {
    path: "authentication",
    component: BlankComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./authentication/authentication.module").then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  // {
  //   path: "**",
  //   redirectTo: "authentication/notfound",
  // },
];

export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyBalanceReportComponent } from './monthly-balance-report/monthly-balance-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Monthly Balance Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Monthly Balance Report' }
      ]
    },
    component: MonthlyBalanceReportComponent
  }
];

@NgModule({
  imports: [FormsModule,NgbPaginationModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [MonthlyBalanceReportComponent],
  declarations: [MonthlyBalanceReportComponent],

})
export class MonthlyBalanceReportModule { }

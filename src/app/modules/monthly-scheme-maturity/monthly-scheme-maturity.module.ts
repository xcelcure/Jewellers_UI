import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlySchemeMaturityComponent } from './monthly-scheme-maturity/monthly-scheme-maturity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Monthly Scheme Maturity Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Monthly Scheme Maturity Report' }
      ]
    },
    component: MonthlySchemeMaturityComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [MonthlySchemeMaturityComponent],
  declarations: [MonthlySchemeMaturityComponent],

})
export class MonthlySchemeMaturityModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CashBankComponent } from './cash-bank/cash-bank.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cash Bank Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Cash Bank Report' }
      ]
    },
    component: CashBankComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [CashBankComponent],
  declarations: [CashBankComponent]
})
export class CashBankModule { }

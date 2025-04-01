import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyProductSaleComponent } from './monthly-product-sale/monthly-product-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Monthly Product Sales Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Monthly Product Sales Report' }
      ]
    },
    component: MonthlyProductSaleComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [MonthlyProductSaleComponent],
  declarations: [MonthlyProductSaleComponent],

})
export class MonthlyProductSaleModule { }

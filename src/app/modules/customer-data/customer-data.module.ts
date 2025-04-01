import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer Sales Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Customer Sales Report' }
      ]
    },
    component: CustomerDataComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [CustomerDataComponent],
  declarations: [CustomerDataComponent],

})
export class CustomerDataModule { }

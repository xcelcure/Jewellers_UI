import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchStockComponent } from './branch-stock/branch-stock.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Branch Stock Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Branch Stock Report' }
      ]
    },
    component: BranchStockComponent
  }
];

@NgModule({
  imports: [FormsModule,NgbPaginationModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [BranchStockComponent],
  declarations: [BranchStockComponent],

})
export class BranchStockModule { }

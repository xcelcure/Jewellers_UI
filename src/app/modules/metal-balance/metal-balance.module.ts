import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetalBalanceComponent } from './metal-balance/metal-balance.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Metal Balance Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Metal Balance Report' }
      ]
    },
    component: MetalBalanceComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [MetalBalanceComponent],
  declarations: [MetalBalanceComponent]
})
export class MetalBalanceModule { }

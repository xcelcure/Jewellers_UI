import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyCashCollectionComponent } from './daily-cash-collection/daily-cash-collection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Daily Cash Collection Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Daily Cash Collection Report' }
      ]
    },
    component: DailyCashCollectionComponent
  }
];

@NgModule({
  imports: [FormsModule,NgbPaginationModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [DailyCashCollectionComponent],
  declarations: [DailyCashCollectionComponent],

})
export class DailyCashCollectionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailynotesComponent } from './dailynotes.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Gem Stock Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'GemStock Report' }
      ]
    },
    component: DailynotesComponent
  }
];
@NgModule({
  imports: [FormsModule,NgbPaginationModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [DailynotesComponent],
  declarations: [DailynotesComponent]
})
export class DailynotesModule { }

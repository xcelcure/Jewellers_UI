import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MisdailynotesComponent } from './misdailynotes/misdailynotes.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Daliy Note Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Daliy Note Report' }
      ]
    },
    component: MisdailynotesComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [MisdailynotesComponent],
  declarations: [MisdailynotesComponent]
})
export class MisdailynotesModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SundryCreditorsComponent } from './sundry-creditors/sundry-creditors.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sundry Creditors Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Sundry Creditors Report' }
      ]
    },
    component: SundryCreditorsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [SundryCreditorsComponent],
  declarations: [SundryCreditorsComponent]
})
export class SundryCreditorsModule { }

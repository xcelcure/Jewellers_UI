import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OldGlodComponent } from './old-glod/old-glod.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Old Gold Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Old Gold Report' }
      ]
    },
    component: OldGlodComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [OldGlodComponent],
  declarations: [OldGlodComponent]
})
export class OldGlodModule { }

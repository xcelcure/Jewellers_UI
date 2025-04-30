import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmithPositionComponent } from './smith-position/smith-position.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Smith Position Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Smith Position Report' }
      ]
    },
    component: SmithPositionComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [SmithPositionComponent],
  declarations: [SmithPositionComponent]
})
export class SmithPositionModule { }

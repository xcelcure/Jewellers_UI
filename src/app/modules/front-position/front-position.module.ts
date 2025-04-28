import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FrontPositionComponent } from './front-position.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Fund Position Report',
      urls: [
        { title: 'Reports', url: '/' },
        { title: 'Fund Position Report' }
      ]
    },
    component: FrontPositionComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,DataTablesModule, RouterModule.forChild(routes), NgbModule],
  providers: [],
  bootstrap: [FrontPositionComponent],
  declarations: [FrontPositionComponent]
})
export class FrontPositionModule {}

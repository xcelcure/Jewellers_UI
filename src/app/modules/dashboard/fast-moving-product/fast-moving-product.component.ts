import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-fast-moving-product',
  templateUrl: './fast-moving-product.component.html',
  styleUrls: ['./fast-moving-product.component.scss']
})
export class FastMovingProductComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  constructor() { }

  ngOnInit() {
  }

}

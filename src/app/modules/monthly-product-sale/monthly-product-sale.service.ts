import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../starter/model/branchModel';
import { MonthlyProductSaleListViewModel, MonthlyProductSaleViewModel } from './monthlyProductSaleViewModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MonthlyProductSaleService {

  apiUrl: string = environment.apiURL;

  constructor(private http:HttpClient) { }
 
 
  getAllBarnch( branchViewModel: BranchViewModel ) {
   const url = this.apiUrl+"api/Branch/GetAllBranch";
   return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
 }
 getAllmonthlyProductSaleReport( monthlyProductSaleViewModel: MonthlyProductSaleViewModel ) {
   const url = this.apiUrl+"api/SalesReportContoller/MonthlyProductSaleReport";
   return this.http.post<MonthlyProductSaleListViewModel>(url,monthlyProductSaleViewModel,httpOptions);
 }
}

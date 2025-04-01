import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../starter/model/branchModel';
import { MonthlySchemeMaturityViewModel } from './monthlySchemeMaturityViewModel';
import { MonthlyProductSaleListViewModel } from '../monthly-product-sale/monthlyProductSaleViewModel';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MonthlySchemeMaturityService {


  apiUrl: string = environment.apiURL;

  constructor(private http:HttpClient) { }
 
 
  getAllBarnch( branchViewModel: BranchViewModel ) {
   const url = this.apiUrl+"api/Branch/GetAllBranch";
   return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
 }
 getAllmonthlySchemeMaturityReport( monthlySchemeMaturityViewModel: MonthlySchemeMaturityViewModel ) {
   const url = this.apiUrl+"api/SalesReportContoller/MonthlySchemeMaturityReport";
   return this.http.post<MonthlyProductSaleListViewModel>(url,monthlySchemeMaturityViewModel,httpOptions);
 }
}

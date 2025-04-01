import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../starter/model/branchModel';
import { MonthlyBalanceReportListViewModel, MonthlyBalanceReportViewModel } from './monthlyBalanceReportViewModel';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl: string = environment.apiURL;

  constructor(private http:HttpClient) { }
 
 
  getAllBarnch( branchViewModel: BranchViewModel ) {
   const url = this.apiUrl+"api/Branch/GetAllBranch";
   return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
 }
 getAllmonthlyBalanceReport( monthlyBalanceReportViewModel: MonthlyBalanceReportViewModel ) {
   const url = this.apiUrl+"api/SalesReportContoller/GetMonthlyBalanceReport";
   return this.http.post<MonthlyBalanceReportListViewModel>(url,monthlyBalanceReportViewModel,httpOptions);
 }
}
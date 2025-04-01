import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { BranchStockListViewModel, BranchStockViewModel } from '../branch-stock/branchStockViewModel';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BtanchStockService {


  apiUrl: string = environment.apiURL;

  constructor(private http:HttpClient) { }
 
 
  getAllBarnch( branchViewModel: BranchViewModel ) {
   const url = this.apiUrl+"api/Branch/GetAllBranch";
   return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
 }
 getAllbranchstock( branchStockViewModel: BranchStockViewModel ) {
   const url = this.apiUrl+"api/SalesReportContoller/GetBranchStockStatus";
   return this.http.post<BranchStockListViewModel>(url,branchStockViewModel,httpOptions);
 }

}
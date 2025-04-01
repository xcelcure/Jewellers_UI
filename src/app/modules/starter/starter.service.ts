import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from './model/branchModel';
import { SalesReportListViewModel, SalesReportViewModel } from './model/salesReportModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StarterService {

  apiUrl: string = environment.apiURL;

 constructor(private http:HttpClient) { }


 getAllBarnch( branchViewModel: BranchViewModel ) {
  const url = this.apiUrl+"api/Branch/GetAllBranch";
  return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
}
getAllSales( salesReportViewModel: SalesReportViewModel ) {
  const url = this.apiUrl+"api/SalesReportContoller/SalesReportDashBoard";
  return this.http.post<SalesReportListViewModel>(url,salesReportViewModel,httpOptions);
}

}

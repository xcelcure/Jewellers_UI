import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { DailyCashCollectionListViewModel, DailyCashCollectionViewModel } from '../dailyCashCollectionViewModel';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DailyCashCollectionViewModelService {

  apiUrl: string = environment.apiURL;

  constructor(private http:HttpClient) { }
 
 
  getAllBarnch( branchViewModel: BranchViewModel ) {
   const url = this.apiUrl+"api/Branch/GetAllBranch";
   return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
 }
 getAlldailyCashCollectionReport( dailyCashCollectionViewModel: DailyCashCollectionViewModel ) {
   const url = this.apiUrl+"api/SalesReportContoller/GetDailyCash";
   return this.http.post<DailyCashCollectionListViewModel>(url,dailyCashCollectionViewModel,httpOptions);
 }
}

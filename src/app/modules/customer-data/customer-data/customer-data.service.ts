import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { CustomerDataviewModel, GemCMTime } from '../model/gemCMTime';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  apiUrl: string = environment.apiURL;

  constructor(private http:HttpClient) { }
 
 
  getAllBarnch( branchViewModel: BranchViewModel ) {
   const url = this.apiUrl+"api/Branch/GetAllBranch";
   return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
 }
 getAllSales( customerDataviewModel: CustomerDataviewModel ) {
   const url = this.apiUrl+"api/SalesReportContoller/GetCoustomerData";
   return this.http.post<CustomerDataviewModel>(url,customerDataviewModel,httpOptions);
 }
 
 }
 
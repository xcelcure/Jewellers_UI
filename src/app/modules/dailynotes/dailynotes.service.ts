import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../dailynotes/model/branchModel';
import { DailyNoteModelsViewModel, DailyNoteViewModels } from './model/dailynotesmodel';
import { GemStockListViewModel, GemStockViewModel } from './model/gemStockViewModel';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DailynotesService {

  apiUrl: string = environment.apiURL;

  constructor(private http:HttpClient) { }
 
 
  getAllBarnch( branchViewModel: BranchViewModel ) {
   const url = this.apiUrl+"api/Branch/GetAllBranch";
   return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
 }
 getAllgemstock( gemStockViewModel: GemStockViewModel ) {
   const url = this.apiUrl+"api/SalesReportContoller/GetAllGemStock";
   return this.http.post<GemStockListViewModel>(url,gemStockViewModel,httpOptions);
 }

}

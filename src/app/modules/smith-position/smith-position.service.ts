import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DailyNoteInput, DailyNoteOutput } from '../misdailynotes/misdailynotes/dailyNote';
import { BranchViewModel, BranchListViewModel } from '../starter/model/branchModel';
import { SmithSummaryInput } from './smithSummary';
export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SmithPositionService {

  apiUrl: string = environment.apiURL;

 constructor(private http:HttpClient) { }


 getAllBarnch( branchViewModel: BranchViewModel ) {
  const url = this.apiUrl+"api/Branch/GetAllBranch";
  return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
}
getSmithSummary( smithSummaryInput: SmithSummaryInput ) {
  const url = this.apiUrl+"api/SalesReportContoller/GetSmithSummaryData";
  return this.http.post<DailyNoteOutput>(url,smithSummaryInput,httpOptions);
}

}
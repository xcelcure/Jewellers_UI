import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { SalesReportViewModel } from '../../starter/model/salesReportModel';
import { DailyNoteInput, DailyNoteOutput } from './dailyNote';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MisdailynotesService {

  apiUrl: string = environment.apiURL;

 constructor(private http:HttpClient) { }


 getAllBarnch( branchViewModel: BranchViewModel ) {
  const url = this.apiUrl+"api/Branch/GetAllBranch";
  return this.http.post<BranchListViewModel>(url,branchViewModel,httpOptions);
}
getDailyNote( dailyNoteInput: DailyNoteInput ) {
  const url = this.apiUrl+"api/SalesReportContoller/GetDailyNoteData";
  return this.http.post<DailyNoteOutput>(url,dailyNoteInput,httpOptions);
}

}
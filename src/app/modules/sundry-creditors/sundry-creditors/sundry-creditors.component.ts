import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, map, take } from 'rxjs/operators';
import { LoginService } from 'src/app/authentication/login/service/login.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as XLSX from 'xlsx';
import { BtanchStockService } from '../../branch-stock/service/btanch-stock.service';
import { DailyNoteOutput } from '../../misdailynotes/misdailynotes/dailyNote';
import { MisdailynotesService } from '../../misdailynotes/misdailynotes/misdailynotes.service';
import { MonthlyBalanceReportListViewModel } from '../../monthly-balance-report/monthlyBalanceReportViewModel';
import { ServiceService } from '../../monthly-balance-report/service.service';
import { SmithPositionService } from '../../smith-position/smith-position.service';
import { SmithSummaryOutput, SmithSummaryInput } from '../../smith-position/smithSummary';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { StarterService } from '../../starter/starter.service';
import { CreditorsBalanceInputModel, CreditorsBalanceLVModel } from '../creditorsBalanceModel';

@Component({
  selector: 'app-sundry-creditors',
  templateUrl: './sundry-creditors.component.html',
  styleUrls: ['./sundry-creditors.component.css']
})
export class SundryCreditorsComponent implements OnInit {

 
  ngAfterViewInit() {}
  
  branchListViewModel = new BranchListViewModel();
  pageNumber: number = 1;
  recordPerPage: number = 10;
  arrayobj: any[] = [];
  @Input() finYear = "";
  subtitle: string;
  // public apiUrl: string = environment.apiURL;
  tabledata: any;

  monthlyBalanceReportListViewModel = new MonthlyBalanceReportListViewModel();
  dailyNoteOutput = new DailyNoteOutput();
  creditorsBalanceLVModel = new CreditorsBalanceLVModel();
  clickDwnld: boolean = false;

  currentUser: any;

  form = new FormGroup({
    branch: new FormControl(null),
    fromdate: new FormControl("", Validators.required),
    enddate: new FormControl("", Validators.required),
    finyr: new FormControl(this.finYear),
  });

  finYarn: { finYr: string; dtFrom: string; dtTo: string }[] = [];
  constructor(
    private loginService: LoginService,
    public starterService: StarterService,
    private dashboardService: DashboardService,
    public btanchStockService:BtanchStockService,
    public serviceService:ServiceService,
    public misdailynotesService:MisdailynotesService,
    public smithPositionService:SmithPositionService,
  ) {
    this.subtitle = "Smith Position Report";
  }
  ngOnInit() {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    this.loginService.user$.subscribe((user) => {
      if (user.role == 'Admin') {
        this.form.get("branch").setValue(user.brCode);
      }
      this.currentUser = user;
    });

    this.getAllBranch();
    this.form
      .get("enddate")
      .setValue(formatDate(lastDay, "yyyy-MM-dd", "en-US"));
    this.form
      .get("fromdate")
      .setValue(formatDate(firstDay, "yyyy-MM-dd", "en-US"));
      // this.form
      // .get("enddate")
      // .setValue(this.getTodayDate());
     this.getAllBranch();

    this.dashboardService
    .getAllFinYars()
    .pipe(
      switchMap((finYears) => {
        return this.loginService.user$.pipe(
          map((user) => {
            return {
              finYears,
              user,
            };
          })
        );
      })
    )
    .pipe(take(1))
    .subscribe((res) => {
      this.finYarn = res.finYears.listTbl;
      const active = this.finYarn.find((t) => {
        const startdate = new Date(t.dtFrom);
        const endDate = new Date(t.dtTo);
        const today = new Date();
        return startdate <= today && today <= endDate;
      });
      this.form.patchValue({
        finyr: active.finYr,
        branch: res.user.role == 'Admin' ? "" : res.user.brCode,
      });
       
    });
  }


  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10); // format: 'YYYY-MM-DD'
  }
 
  getAllBranch() {
    let branchViewModel = new BranchViewModel();
    this.starterService.getAllBarnch(branchViewModel).subscribe((res) => {
      if (res) {
        this.branchListViewModel = res;
      }
    });
  }

  get f() {
    return this.form.controls;
  }
  onPrint() {
    this.clickDwnld = false;
    this.getAllSaleDataforPrint();
  }
  onDownload() {
    this.clickDwnld = true;
    this.getAllSaleDataforPrint();
  }

  getAllSaleDataforPrint(){
    const creditorsBalanceInputModel = new CreditorsBalanceInputModel();
    
    if (this.form.value.branch == "null" || this.form.value.branch == "") {
      creditorsBalanceInputModel.fromDate = new Date(this.form.value.fromdate);
      creditorsBalanceInputModel.toDate = new Date(this.form.value.enddate);
      creditorsBalanceInputModel.pageNumber = this.pageNumber;
      creditorsBalanceInputModel.pageSize = this.recordPerPage;
      creditorsBalanceInputModel.finyr = this.form.value.finyr;
    } else {
      creditorsBalanceInputModel.fromDate = new Date(this.form.value.fromdate);
      creditorsBalanceInputModel.toDate = new Date(this.form.value.enddate);
      creditorsBalanceInputModel.pageNumber = this.pageNumber;
      creditorsBalanceInputModel.pageSize = this.recordPerPage;
      creditorsBalanceInputModel.finyr = this.form.value.finyr;
    }
    this.smithPositionService.getSundayCreditor(creditorsBalanceInputModel).subscribe((res) => {
      this.creditorsBalanceLVModel = res;
      
         if (!this.clickDwnld) {
           setTimeout(() => {
             this.printData();
           }, 100);
         } else {
           setTimeout(() => {
             this.download();
           }, 100);
         }
   
         //console.log(this.salesListReportViewModelforPrint);
       });
  }
  submit() {
    console.log(this.form.value);
    const creditorsBalanceInputModel = new CreditorsBalanceInputModel();
    
    if (this.form.value.branch == "null" || this.form.value.branch == "") {
      creditorsBalanceInputModel.fromDate = new Date(this.form.value.fromdate);
      creditorsBalanceInputModel.toDate = new Date(this.form.value.enddate);
      creditorsBalanceInputModel.pageNumber = this.pageNumber;
      creditorsBalanceInputModel.pageSize = this.recordPerPage;
      creditorsBalanceInputModel.finyr = this.form.value.finyr;
    } else {
      creditorsBalanceInputModel.fromDate = new Date(this.form.value.fromdate);
      creditorsBalanceInputModel.toDate = new Date(this.form.value.enddate);
      creditorsBalanceInputModel.pageNumber = this.pageNumber;
      creditorsBalanceInputModel.pageSize = this.recordPerPage;
      creditorsBalanceInputModel.finyr = this.form.value.finyr;
    }
    this.smithPositionService.getSundayCreditor(creditorsBalanceInputModel).subscribe((res) => {
      this.creditorsBalanceLVModel = res;
    });
  }


  printData() {
    const printContent = document.getElementById("printDIV");
    const WindowPrt = window.open("", "Print-Window");
    WindowPrt.document.open();
    WindowPrt.document.write(
      '<link rel="stylesheet" type="text/css" href="../assets/css/bootstrap.min.css"/>'
    );
    WindowPrt.document.write(
      '<body onload="window.print()">' +
        printContent.innerHTML +
        "</body></html>"
    );
    WindowPrt.document.close();
    WindowPrt.onafterprint = function () {
      WindowPrt.close();
    };
  }

  onRecordPerPageChange() {
    this.submit();
  }

  onPageChange(page) {
    this.pageNumber = page;
    this.submit();
  }

  title = "Excel";


  download() {
    const table = document.getElementById("printDIV");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "MonthlyBalanceReport.xlsx");
  }

get TotalCreditorsBalance(): number {
  return this.creditorsBalanceLVModel.creditorsBalanceModels.reduce((acc, curr) => acc + curr.creditorsBalance, 0);
}
}
import { formatDate } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/authentication/login/service/login.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { SalesReportListViewModel } from '../../starter/model/salesReportModel';
import { MisdailynotesService } from './misdailynotes.service';
import { DailyNoteInput, DailyNoteOutput } from './dailyNote';
import { ServiceService } from '../../monthly-balance-report/service.service';
import { BtanchStockService } from '../../branch-stock/service/btanch-stock.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StarterService } from '../../starter/starter.service';
import { map, switchMap, take } from 'rxjs/operators';
import { MonthlyBalanceReportListViewModel } from '../../monthly-balance-report/monthlyBalanceReportViewModel';

@Component({
  selector: 'app-misdailynotes',
  templateUrl: './misdailynotes.component.html',
  styleUrls: ['./misdailynotes.component.css']
})
export class MisdailynotesComponent implements OnInit {

 
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
  ) {
    this.subtitle = "Daliy Note Report";
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
    // this.form
    //   .get("enddate")
    //   .setValue(formatDate(lastDay, "yyyy-MM-dd", "en-US"));
    this.form
      .get("fromdate")
      .setValue(formatDate(firstDay, "yyyy-MM-dd", "en-US"));
      this.form
      .get("enddate")
      .setValue(this.getTodayDate());
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
  onPrint() {
    this.clickDwnld = false;
    this.getAllSaleDataforPrint();
  }
  onDownload() {
    this.clickDwnld = true;
     this.getAllSaleDataforPrint();
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

  submit() {
    console.log(this.form.value);
    const dailyNoteInput = new DailyNoteInput();
    
    if (this.form.value.branch == "" || this.form.value.branch == "null") {
      dailyNoteInput.date = new Date(this.form.value.enddate);
      dailyNoteInput.financialYear = this.form.value.finyr;
      dailyNoteInput.pageNumber = this.pageNumber;
      dailyNoteInput.pageSize = this.recordPerPage;
    } else {
      dailyNoteInput.date = new Date(this.form.value.enddate);
      dailyNoteInput.financialYear = this.form.value.finyr;
      dailyNoteInput.branchCode = this.form.value.branch;
      dailyNoteInput.pageNumber = this.pageNumber;
      dailyNoteInput.pageSize = this.recordPerPage;
    }
    this.misdailynotesService.getDailyNote(dailyNoteInput).subscribe((res) => {
      this.dailyNoteOutput = res;
    });
  }
  getAllSaleDataforPrint(){
    const dailyNoteInput = new DailyNoteInput();
    
    if (this.form.value.branch == "" || this.form.value.branch == "null") {
      dailyNoteInput.date = new Date(this.form.value.enddate);
      dailyNoteInput.financialYear = this.form.value.finyr;
      dailyNoteInput.pageNumber = this.pageNumber;
      dailyNoteInput.pageSize = this.recordPerPage;
    } else {
      dailyNoteInput.date = new Date(this.form.value.enddate);
      dailyNoteInput.financialYear = this.form.value.finyr;
      dailyNoteInput.branchCode = this.form.value.branch;
      dailyNoteInput.pageNumber = this.pageNumber;
      dailyNoteInput.pageSize = this.recordPerPage;
    }
    this.misdailynotesService.getDailyNote(dailyNoteInput).subscribe((res) => {
      this.dailyNoteOutput = res;
   
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

  get TotalCash(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.cash || 0), 0);
  }
  
  get TotalDD(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.dd || 0), 0);
  }
  
  get TotalCC(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.cc || 0), 0);
  }
  
  get TotalCustomer(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.customer || 0), 0);
  }
  
  get TotalGV(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.gv || 0), 0);
  }
  
  get TotalUPI(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.upi || 0), 0);
  }
  
  get TotalAmount(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.totalamount || 0), 0);
  }
  
  get TotalCashCredit(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.cash_credit || 0), 0);
  }
  
  get TotalChqCredit(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.chq_credit || 0), 0);
  }
  
  get TotalAmountCredit(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.totamount_credit || 0), 0);
  }
  
  get TotalVnoCredit(): number {
    return this.dailyNoteOutput.listDailyNote.reduce((acc, curr) => acc + (curr.vno_credit || 0), 0);
  }
}

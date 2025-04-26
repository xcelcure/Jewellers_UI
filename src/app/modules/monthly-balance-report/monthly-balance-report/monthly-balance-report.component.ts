import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { BranchStockListViewModel } from '../../branch-stock/branch-stock/branchStockViewModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/authentication/login/service/login.service';
import { StarterService } from '../../starter/starter.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BtanchStockService } from '../../branch-stock/service/btanch-stock.service';
import { formatDate } from '@angular/common';
import { map, switchMap, take } from 'rxjs/operators';
import * as XLSX from "xlsx";
import { MonthlyBalanceReportListViewModel, MonthlyBalanceReportViewModel } from '../monthlyBalanceReportViewModel';

@Component({
  selector: 'app-monthly-balance-report',
  templateUrl: './monthly-balance-report.component.html',
  styleUrls: ['./monthly-balance-report.component.css']
})
export class MonthlyBalanceReportComponent implements OnInit {

 
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
  // dailyNoteListViewModelforPrint = new DailyNoteModelsViewModel();
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
  ) {
    this.subtitle = "Monthly Balance Report";
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
    const dailyNoteVM = new MonthlyBalanceReportViewModel();
    dailyNoteVM.toDate = new Date(this.form.value.enddate);
    dailyNoteVM.finyr = this.form.value.finyr;
    dailyNoteVM.branch = this.form.value.branch;
    dailyNoteVM.pageNumber = this.pageNumber;
    dailyNoteVM.pageSize = this.recordPerPage;
    // dailyNoteVM.pageSize=10
    this.serviceService.getAllmonthlyBalanceReport(dailyNoteVM).subscribe((res) => {
      this.monthlyBalanceReportListViewModel = res;
    });
  }


  getAllDailyNotesforPrint() {
    const dailyNoteVM = new MonthlyBalanceReportViewModel();
    dailyNoteVM.toDate = new Date(this.form.value.enddate);
    dailyNoteVM.finyr = this.form.value.finyr;
    dailyNoteVM.branch = this.form.value.branch;
    dailyNoteVM.pageNumber = this.pageNumber;
    dailyNoteVM.pageSize = this.recordPerPage;
    // dailyNoteVM.pageSize=10
    this.serviceService.getAllmonthlyBalanceReport(dailyNoteVM).subscribe((res) => {
      this.monthlyBalanceReportListViewModel = res;
   
    });
      if (!this.clickDwnld) {
        setTimeout(() => {
          this.printData();
        }, 100);
      } else {
        setTimeout(() => {
          this.download();
        }, 100);
      }
    
  }


  onPrint() {
    this.clickDwnld = false;
    this.getAllDailyNotesforPrint();
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

  onDownload() {
    this.clickDwnld = true;
    this.getAllDailyNotesforPrint();
  }

  download() {
    const table = document.getElementById("printDIV");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "MonthlyBalanceReport.xlsx");
  }

  get GetTotaloP_BullionForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.oP_Bullion;
    }, 0);
    
  }
  get GetTotaloP_OGForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.oP_OG;
    }, 0);
    
  }
  get GetTotaloP_OG24ForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.oP_OG24;
    }, 0);
    
  }
  get GetTotaloP_18KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.oP_18K;
    }, 0);
    
  }
 
  get GetTotaloP_22KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.oP_22K;
    }, 0);
    
  }
  get GetTotaloP_24KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.oP_24K;
    }, 0);
    
  }


  get GetTotalpur_BullionForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.pur_Bullion ;
    }, 0);
    
  }
 
  get GetTotalpuR_OG_0ForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.puR_OG_0 ;
    }, 0);
    
  }
  get GetTotalpuR_OG_18ForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.puR_OG_18 ;
    }, 0);
    
  }
  
  get GetTotalpuR_OG_22ForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.puR_OG_22  ;
    }, 0);
    
  }

  get GetTotalpuR_OG_24ForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.puR_OG_24 ;
    }, 0);
    
  }
  get GetTotalissuE_BuliionForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_Buliion ;
    }, 0);
    
  }


  get GetTotalissuE_OG_24ForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_OG_24  ;
    }, 0);
    
  }

  get GetTotalissuE_18KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.puR_OG_24 ;
    }, 0);
    
  }
  get GetTotalissuE_22KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_22K ;
    }, 0);
    
  }
  get GetTotalissuE_24KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_24K ;
    }, 0);
    
  }
  get GetTotalissuE_TO_SLG_OGForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_TO_SLG_OG ;
    }, 0);
    
  }
  get GetTotalissuE_TO_SLG_18KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_TO_SLG_18K ;
    }, 0);

    
  }

  get GetTotalissuE_TO_SLG_22KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_TO_SLG_22K;
    }, 0);
    
    
  }
  get GetTotalissuE_TO_SLG_24KForView(){
    return this.monthlyBalanceReportListViewModel.listMonthlyBalance.reduce((acc, curr) => {
      return acc + curr.issuE_TO_SLG_24K;
    }, 0);
    
    
  }
  
}

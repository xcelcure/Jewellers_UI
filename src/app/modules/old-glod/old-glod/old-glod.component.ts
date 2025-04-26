import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, map, take } from 'rxjs/operators';
import { LoginService } from 'src/app/authentication/login/service/login.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as XLSX from 'xlsx';
import { BranchStockListViewModel, BranchStockViewModel } from '../../branch-stock/branch-stock/branchStockViewModel';
import { BtanchStockService } from '../../branch-stock/service/btanch-stock.service';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { StarterService } from '../../starter/starter.service';

@Component({
  selector: 'app-old-glod',
  templateUrl: './old-glod.component.html',
  styleUrls: ['./old-glod.component.css']
})
export class OldGlodComponent implements OnInit {

ngAfterViewInit() {}
  
    branchListViewModel = new BranchListViewModel();
    pageNumber: number = 1;
    recordPerPage: number = 10;
    arrayobj: any[] = [];
    @Input() finYear = "";
    subtitle: string;
    // public apiUrl: string = environment.apiURL;
    tabledata: any;
  
    branchStockListViewModel = new BranchStockListViewModel();
    // dailyNoteListViewModelforPrint = new DailyNoteModelsViewModel();
    clickDwnld: boolean = false;
  
    currentUser: any;
  
    form = new FormGroup({
      branch: new FormControl(null, Validators.required),
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
    ) {
      this.subtitle = "Old Gold Report";
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
  
      const dailyNoteVM = new BranchStockViewModel();
      if (this.form.value.branch =="" || this.form.value.branch == "null") {
        dailyNoteVM.toDate = new Date(this.form.value.enddate);
      dailyNoteVM.finyr = this.form.value.finyr;
      dailyNoteVM.pageNumber = this.pageNumber;
      dailyNoteVM.pageSize = this.recordPerPage;
      } else {
      dailyNoteVM.toDate = new Date(this.form.value.enddate);
      dailyNoteVM.finyr = this.form.value.finyr;
      dailyNoteVM.branch = this.form.value.branch;
      dailyNoteVM.pageNumber = this.pageNumber;
      dailyNoteVM.pageSize = this.recordPerPage;
        }
      this.btanchStockService.getAllbranchstock(dailyNoteVM).subscribe((res) => {
        this.branchStockListViewModel = res;
      });
    }
  

    getAllDailyNotesforPrint() {
 
      const dailyNoteVM = new BranchStockViewModel();
      dailyNoteVM.toDate = new Date(this.form.value.toDate);
      dailyNoteVM.finyr = this.form.value.finyr;
      dailyNoteVM.branch = this.form.value.branch;
      dailyNoteVM.pageNumber = this.pageNumber;
      // dailyNoteVM.pageSize = this.recordPerPage;
      dailyNoteVM.pageSize=10
      this.btanchStockService.getAllbranchstock(dailyNoteVM).subscribe((res) => {
        this.branchStockListViewModel = res;
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
      XLSX.writeFile(wb, "BranchstockReport.xlsx");
    }
  
    get GetTotalfG_24KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.fG_24K;
      }, 0);
      
    }
    get GetTotalfG_22KKForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.fG_22K;
      }, 0);
      
    }
    get GetTotalfG_18KKForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.fG_18K;
      }, 0);
      
    }
    get GetTotaloR_24KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.oR_24K;
      }, 0);
      
    }
   
    get GetTotaloR_22KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.oR_22K;
      }, 0);
      
    }
    get GetTotaloR_18KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.oR_18K;
      }, 0);
      
    }


    get GetTotaloR_0KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.oR_0K ;
      }, 0);
      
    }
   
    get GetTotalfS_0KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.fS_0K ;
      }, 0);
      
    }
    get GetTotalfS_925KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.fS_925K;
      }, 0);
      
    }
    
    get GetTotalfS_85KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.fS_85K ;
      }, 0);
      
    }

    get GetTotalfS_70KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.fS_70K ;
      }, 0);
      
    }
    get GetTotalrS_0KForView(){
      return this.branchStockListViewModel.listStock.reduce((acc, curr) => {
        return acc + curr.rS_0K ;
      }, 0);
      
    }
 
  }


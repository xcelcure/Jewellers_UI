import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MonthlyProductSaleService } from '../../monthly-product-sale/monthly-product-sale.service';
import { StarterService } from '../../starter/starter.service';
import { LoginService } from 'src/app/authentication/login/service/login.service';
import { MonthlySchemeMaturityService } from '../monthly-scheme-maturity.service';
import { formatDate } from '@angular/common';
import { MonthlySchemeMaturityListViewModel, MonthlySchemeMaturityViewModel } from '../monthlySchemeMaturityViewModel';
@Component({
  selector: 'app-monthly-scheme-maturity',
  templateUrl: './monthly-scheme-maturity.component.html',
  styleUrls: ['./monthly-scheme-maturity.component.css']
})
export class MonthlySchemeMaturityComponent implements OnInit,AfterViewInit {
    ngAfterViewInit() {}
  
    branchListViewModel = new BranchListViewModel();
    pageNumber: number = 1;
    recordPerPage: number = 10;
    arrayobj: any[] = [];
  
    subtitle: string;
    public apiUrl: string = environment.apiURL;
    tabledata: any;
  
    monthlySchemeMaturityListViewModel = new MonthlySchemeMaturityListViewModel();
    clickDwnld: boolean = false;
    form = new FormGroup({
      branch: new FormControl("null", Validators.required),
      fromdate: new FormControl("", Validators.required),
      enddate: new FormControl("", Validators.required),
    });
    currentUser: any;
    constructor(
      public starterService: StarterService,
      private loginService: LoginService,
      public monthlySchemeMaturityService:MonthlySchemeMaturityService,
      public monthlyProductSaleService:MonthlyProductSaleService,
    ) {
      this.subtitle = "Monthly Scheme Maturity Report";
    }
    ngOnInit() {
      const date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);
      this.getAllBranch();
      this.loginService.user$.subscribe((user) => {
        if (user.role == 'Admin') {
          this.form.get("branch").setValue(user.brCode);
        }
        this.currentUser = user;
      });
  
      this.form
        .get("enddate")
        .setValue(formatDate(lastDay, "yyyy-MM-dd", "en-US"));
      this.form
        .get("fromdate")
        .setValue(formatDate(firstDay, "yyyy-MM-dd", "en-US"));
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
      const monthlySchemeMaturityViewModel = new MonthlySchemeMaturityViewModel();
      if (this.form.value.branch == "null") {
        monthlySchemeMaturityViewModel.fromDate = new Date(this.form.value.fromdate);
        monthlySchemeMaturityViewModel.toDate = new Date(this.form.value.enddate);
        monthlySchemeMaturityViewModel.pageNumber = this.pageNumber;
        monthlySchemeMaturityViewModel.pageSize = this.recordPerPage;
      } else {
     
      monthlySchemeMaturityViewModel.fromDate = new Date(this.form.value.fromdate);
      monthlySchemeMaturityViewModel.toDate = new Date(this.form.value.enddate);
      monthlySchemeMaturityViewModel.barCode = this.form.value.branch;
      monthlySchemeMaturityViewModel.pageNumber = this.pageNumber;
      monthlySchemeMaturityViewModel.pageSize = this.recordPerPage;
      }
      this.monthlySchemeMaturityService.getAllmonthlySchemeMaturityReport(monthlySchemeMaturityViewModel).subscribe((res) => {
        this.monthlySchemeMaturityListViewModel = res;
      });
    }
  
    getAllSaleDataforPrint() {
      const monthlySchemeMaturityViewModel = new MonthlySchemeMaturityViewModel();
      monthlySchemeMaturityViewModel.fromDate = new Date(this.form.value.fromdate);
      monthlySchemeMaturityViewModel.toDate = new Date(this.form.value.enddate);
      monthlySchemeMaturityViewModel.barCode = this.form.value.branch;
      monthlySchemeMaturityViewModel.pageNumber = this.pageNumber;
      monthlySchemeMaturityViewModel.pageSize = this.recordPerPage;
  
      this.monthlySchemeMaturityService.getAllmonthlySchemeMaturityReport(monthlySchemeMaturityViewModel).subscribe((res) => {
        this.monthlySchemeMaturityListViewModel = res;
      // });
  
        if (!this.clickDwnld) {
          setTimeout(() => {
            this.printData();
          }, 100);
        } else {
          setTimeout(() => {
            this.download();
          }, 100);
        }
      });
    }
  
    onPrint() {
      this.clickDwnld = false;
      this.getAllSaleDataforPrint();
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
      this.getAllSaleDataforPrint();
    }
  
    download() {
      const table = document.getElementById("printDIV");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "MonthlyProductSalesReport.xlsx");
    }
  
  
   get GetTotalgrossWt() {
    return this.monthlySchemeMaturityListViewModel.listMaturity.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
   }
   get GetTotalnetWt() {
    return this.monthlySchemeMaturityListViewModel.listMaturity.reduce((acc, curr) => {
      return acc + curr.accumGold;
    }, 0);
   }
  get GetTotalgemwt() {
    return this.monthlySchemeMaturityListViewModel.listMaturity.reduce((acc, curr) => {
      return acc + curr.taxableAmt;
    }, 0);
  }
  
  }
  


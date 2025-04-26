import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StarterService } from '../../starter/starter.service';
import { LoginService } from 'src/app/authentication/login/service/login.service';
import { CustomerDataService } from '../../customer-data/customer-data/customer-data.service';
import { DailyCashCollectionViewModelService } from '../service/daily-cash-collection-view-model.service';
import { DailyCashCollectionListViewModel, DailyCashCollectionViewModel } from '../dailyCashCollectionViewModel';
import { formatDate } from '@angular/common';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-daily-cash-collection',
  templateUrl: './daily-cash-collection.component.html',
  styleUrls: ['./daily-cash-collection.component.css']
})
export class DailyCashCollectionComponent implements OnInit , AfterViewInit {
    ngAfterViewInit() {}
  
    branchListViewModel = new BranchListViewModel();
    pageNumber: number = 1;
    recordPerPage: number = 10;
    arrayobj: any[] = [];
  
    subtitle: string;
    public apiUrl: string = environment.apiURL;
    tabledata: any;

    clickDwnld: boolean = false;
    dailyCashCollectionListViewModel = new DailyCashCollectionListViewModel();
    form = new FormGroup({
      branch: new FormControl("null", Validators.required),
      fromdate: new FormControl("", Validators.required),
      enddate: new FormControl("", Validators.required),
    });
    currentUser: any;
    constructor(
      public starterService: StarterService,
      private loginService: LoginService,
      public customerDataService:CustomerDataService,
      public dailyCashCollectionViewModelService:DailyCashCollectionViewModelService,
    ) {
      this.subtitle = "Daily Cash Collection Report";
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
      const dailyCashCollectionViewModel = new DailyCashCollectionViewModel();
       if (this.form.value.branch == "null") {
        dailyCashCollectionViewModel.fromDate = new Date(this.form.value.fromdate);
        dailyCashCollectionViewModel.toDate = new Date(this.form.value.enddate);
         dailyCashCollectionViewModel.pageNumber = this.pageNumber;
         dailyCashCollectionViewModel.pageSize = this.recordPerPage;
       } else {
      dailyCashCollectionViewModel.toDate = new Date(this.form.value.enddate);
      dailyCashCollectionViewModel.branch = this.form.value.branch;
      dailyCashCollectionViewModel.pageNumber = this.pageNumber;
      dailyCashCollectionViewModel.pageSize = this.recordPerPage;
       }
      this.dailyCashCollectionViewModelService.getAlldailyCashCollectionReport(dailyCashCollectionViewModel).subscribe((res) => {
        this.dailyCashCollectionListViewModel = res;
      });
    }
  
    getAllSaleDataforPrint() {
      const dailyCashCollectionViewModel = new DailyCashCollectionViewModel();
      // dailyCashCollectionViewModel.fromDate = new Date(this.form.value.fromdate);
      dailyCashCollectionViewModel.toDate = new Date(this.form.value.enddate);
      dailyCashCollectionViewModel.branch = this.form.value.branch;
      dailyCashCollectionViewModel.pageNumber = this.pageNumber;
      dailyCashCollectionViewModel.pageSize = this.recordPerPage;
      
      this.dailyCashCollectionViewModelService.getAlldailyCashCollectionReport(dailyCashCollectionViewModel).subscribe((res) => {
        this.dailyCashCollectionListViewModel = res;
  
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
      XLSX.writeFile(wb, "DailycashSalesData.xlsx");
    }
  
  
   get GetTotalcashForView() {
    return this.dailyCashCollectionListViewModel.listDailyCash.reduce((acc, curr) => {
      return acc + Number(curr.rtgs_chq);
    }, 0);
   }
   get GetTotalRate24KtForView() {
    return this.dailyCashCollectionListViewModel.listDailyCash.reduce((acc, curr) => {
      return acc + curr.cash;
    }, 0);
   }
   get GetTotalCardForView(): number {
    return this.dailyCashCollectionListViewModel.listDailyCash.reduce((acc, curr) => {
      return acc + Number(curr.card); // Convert 'card' from string to number
    }, 0);
 
  }
  
  get GetTotalupiView() {
    return this.dailyCashCollectionListViewModel.listDailyCash.reduce((acc, curr) => {
      return acc + curr.upi;
    }, 0);
   }

   get GetTotalcustomerView() {
    return this.dailyCashCollectionListViewModel.listDailyCash.reduce((acc, curr) => {
      return acc + curr.customer;
    }, 0);
   }

   get GetTotaltotalAmountView() {
    return this.dailyCashCollectionListViewModel.listDailyCash.reduce((acc, curr) => {
      return acc + curr.totalAmount;
    }, 0);
   }
   
  }
  

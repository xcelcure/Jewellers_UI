import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SalesReportListViewModel, SalesReportViewModel } from '../../starter/model/salesReportModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StarterService } from '../../starter/starter.service';
import { LoginService } from 'src/app/authentication/login/service/login.service';
import { BranchListViewModel, BranchViewModel } from '../../starter/model/branchModel';
import { formatDate } from '@angular/common';
import * as XLSX from "xlsx";
import { CustomerDataService } from './customer-data.service';
import { CustomerDataviewListModel, CustomerDataviewModel, GemCMTime } from '../model/gemCMTime';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() { }

  branchListViewModel = new BranchListViewModel();
  pageNumber: number = 1;
  recordPerPage: number = 10;
  arrayobj: any[] = [];

  subtitle: string;
  public apiUrl: string = environment.apiURL;
  tabledata: any;

  salesListReportViewModel = new SalesReportListViewModel();
  salesListReportViewModelforPrint = new SalesReportListViewModel();
  clickDwnld: boolean = false;
  customerDataviewListModel = new CustomerDataviewListModel();
  form = new FormGroup({
    branch: new FormControl("null", Validators.required),
    fromdate: new FormControl("", Validators.required),
    enddate: new FormControl("", Validators.required),
  });
  currentUser: any;
  constructor(
    public starterService: StarterService,
    private loginService: LoginService,
    public customerDataService: CustomerDataService,
  ) {
    this.subtitle = "Customer Sales Report";
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
    const salesReportViewModel = new CustomerDataviewModel();
    if (this.form.value.branch == "null") {
      salesReportViewModel.fromDate = new Date(this.form.value.fromdate);
      salesReportViewModel.toDate = new Date(this.form.value.enddate);
      salesReportViewModel.pageNumber = this.pageNumber;
      salesReportViewModel.pageSize = this.recordPerPage;
    } else {
      salesReportViewModel.fromDate = new Date(this.form.value.fromdate);
      salesReportViewModel.toDate = new Date(this.form.value.enddate);
      salesReportViewModel.branch = this.form.value.branch;
      salesReportViewModel.pageNumber = this.pageNumber;
      salesReportViewModel.pageSize = this.recordPerPage;
    }
    this.customerDataService.getAllSales(salesReportViewModel).subscribe((res) => {
      this.customerDataviewListModel = res;
    });
  }

  getAllSaleDataforPrint() {
    const salesReportViewModel = new CustomerDataviewModel();
    salesReportViewModel.fromDate = new Date(this.form.value.fromdate);
    salesReportViewModel.toDate = new Date(this.form.value.enddate);
    salesReportViewModel.branch = this.form.value.branch;
    salesReportViewModel.pageNumber = this.pageNumber;
    salesReportViewModel.pageSize = this.recordPerPage;

    this.customerDataService.getAllSales(salesReportViewModel).subscribe((res) => {
      this.customerDataviewListModel = res;

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
    XLSX.writeFile(wb, "CustomerSalesData.xlsx");
  }


  get GetTotalAxisCCForView() {
    return this.customerDataviewListModel.listCoustomerData.reduce((acc, curr) => {
      return acc + curr.taxableAmt;
    }, 0);
  }
  get GetTotalRate24KtForView() {
    return this.customerDataviewListModel.listCoustomerData.reduce((acc, curr) => {
      return acc + curr.gstAmt;
    }, 0);
  }
  get GetTotalRate22KForView() {
    return this.customerDataviewListModel.listCoustomerData.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
  }

}

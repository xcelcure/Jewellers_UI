import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, AfterViewInit, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { BranchListViewModel, BranchViewModel } from "./model/branchModel";
import {
  SalesReportListViewModel,
  SalesReportViewModel,
} from "./model/salesReportModel";
import { StarterService } from "./starter.service";
import * as XLSX from "xlsx";
import { formatDate } from "@angular/common";
import { LoginService } from "src/app/authentication/login/service/login.service";
@Component({
  templateUrl: "./starter.component.html",
})
export class StarterComponent implements AfterViewInit {
  ngAfterViewInit() {}

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

  form = new FormGroup({
    branch: new FormControl("null", Validators.required),
    fromdate: new FormControl("", Validators.required),
    enddate: new FormControl("", Validators.required),
  });
  currentUser: any;
  constructor(
    public starterService: StarterService,
    private loginService: LoginService
  ) {
    this.subtitle = "Daily Sales Reports";
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

    // this.form
    //   .get("enddate")
    //   .setValue(formatDate(lastDay, "yyyy-MM-dd", "en-US"));
    this.form
    .get("enddate")
    .setValue(this.getTodayDate());
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
  
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10); // format: 'YYYY-MM-DD'
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    const salesReportViewModel = new SalesReportViewModel();
    if (this.form.value.branch == "null") {
      salesReportViewModel.fromDate = new Date(this.form.value.fromdate);
      salesReportViewModel.toDate = new Date(this.form.value.enddate);
      salesReportViewModel.pageNumber = this.pageNumber;
      salesReportViewModel.pageSize = this.recordPerPage;
    } else {
    salesReportViewModel.fromDate = new Date(this.form.value.fromdate);
    salesReportViewModel.toDate = new Date(this.form.value.enddate);
    salesReportViewModel.barCode = this.form.value.branch;
    salesReportViewModel.pageNumber = this.pageNumber;
    salesReportViewModel.pageSize = this.recordPerPage;
    }
    this.starterService.getAllSales(salesReportViewModel).subscribe((res) => {
      this.salesListReportViewModel = res;
    });
  }
  
  getAllSaleDataforPrint() {
    const salesReportViewModel = new SalesReportViewModel();
    salesReportViewModel.fromDate = new Date(this.form.value.fromdate);
    salesReportViewModel.toDate = new Date(this.form.value.enddate);
    salesReportViewModel.barCode = this.form.value.branch;
    salesReportViewModel.pageNumber = this.pageNumber;
    salesReportViewModel.pageSize = 0;

    this.starterService.getAllSales(salesReportViewModel).subscribe((res) => {
      this.salesListReportViewModelforPrint = res;

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
    XLSX.writeFile(wb, "SalesReport.xlsx");
  }

  get GetTotalSaleForView() {
    return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
      return acc + curr.sale;
    }, 0);
  }
  get GetTotalCashForView() {
    return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
      return acc + curr.cash;
    }, 0);
  }
  get GetTotalChqForView() {
    return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
      return acc + curr.chq;
    }, 0);
  }
  get GetTotalCCForView() {
    return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
      return acc + curr.cc;
    }, 0);
  }
  get GetTotalGPForView() {
    return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
      return acc + curr.gp;
    }, 0);
  }
  get GetTotalgVoucherForView() {
    return 0
  }
  get GetTotalUPIForView() {
    return 0
  }
  get GetTotalkutchaForView() {
    return 0
  }
  get GetTotalebsForView() {
    return 0
  }
  get GetTotaldepositForView() {
    return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
      return acc + curr.deposit;
    }, 0);
  }
  get GetTotalchqDepositForView() {
    return 0
  }
  get GetTotalbankForView() {
    return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
      return acc + curr.bank;
    }, 0);
  }

  //

  get GetTotalSaleForDownload() {
    return this.salesListReportViewModelforPrint.salesReportList.reduce(
      (acc, curr) => {
        return acc + curr.sale;
      },
      0
    );
  }
  get GetTotalCashForDownload() {
    return this.salesListReportViewModelforPrint.salesReportList.reduce(
      (acc, curr) => {
        return acc + curr.cash;
      },
      0
    );
  }
  get GetTotalChqForDownload() {
    return this.salesListReportViewModelforPrint.salesReportList.reduce(
      (acc, curr) => {
        return acc + curr.chq;
      },
      0
    );
  }
  get GetTotalCCForDownload() {
    return this.salesListReportViewModelforPrint.salesReportList.reduce(
      (acc, curr) => {
        return acc + curr.cc;
      },
      0
    );
  }
  get GetTotalGPForDownload() {
    return this.salesListReportViewModelforPrint.salesReportList.reduce(
      (acc, curr) => {
        return acc + curr.gp;
      },
      0
    );
  }
  get GetTotalgVoucherForDownload() {
    return 0
  }
  get GetTotalUPIForDownload() {
    return 0
  }
  get GetTotalkutchaForDownload() {
    return 0
  }
  get GetTotalebsForDownload() {
    return 0
  }
  get GetTotaldepositForDownload() {
    return this.salesListReportViewModelforPrint.salesReportList.reduce(
      (acc, curr) => {
        return acc + curr.deposit;
      },
      0
    );
  }
  get GetTotalchqDepositForDownload() {
    return 0
  }
  get GetTotalbankForDownload() {
    return this.salesListReportViewModelforPrint.salesReportList.reduce(
      (acc, curr) => {
        return acc + curr.bank;
      },
      0
    );
  }

 get GetTotalAxisCCForView() {
  return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
    return acc + curr.axisCC;
  }, 0);
 }
 get GetTotalRate24KtForView() {
  return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
    return acc + curr.rate24Kt;
  }, 0);
 }
get GetTotalRate22KForView() {
  return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
    return acc + curr.rate22K;
  }, 0);
}
 get GetTotalRate18KForView(){
  return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
    return acc + curr.rate18k;
  }, 0);
 }
 get  GetTotalMthCumulativeForView(){
  return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
    return acc + curr.mthCumulative;
  }, 0);
 }
 get GetTotalTransferForView(){
  return this.salesListReportViewModel.salesReportList.reduce((acc, curr) => {
    return acc + curr.transfer;
  }, 0);
 }
}

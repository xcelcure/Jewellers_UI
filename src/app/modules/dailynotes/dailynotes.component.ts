import { formatDate } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  BranchListViewModel,
  BranchViewModel,
} from "../starter/model/branchModel";
import {
  DailyNoteModelsViewModel,
  DailyNoteViewModels,
} from "../dailynotes/model/dailynotesmodel";
import * as XLSX from "xlsx";
import { DailynotesService } from "../dailynotes/dailynotes.service";
import { LoginService } from "src/app/authentication/login/service/login.service";
import { GemStockListViewModel, GemStockViewModel } from "./model/gemStockViewModel";
import { StarterService } from "../starter/starter.service";
import { DashboardService } from "src/app/services/dashboard.service";
import { map, switchMap, take } from "rxjs/operators";

@Component({
  selector: "app-dailynotes",
  templateUrl: "./dailynotes.component.html",
  styleUrls: ["./dailynotes.component.css"],
})
export class DailynotesComponent implements OnInit {
  totalCash: number;
  totalCustomer: any;
  totalchq: number;
  totalCard: any;
  totalGift: any;
  totalUpi: any;
  totalSales: any;

  ngAfterViewInit() {}

  branchListViewModel = new BranchListViewModel();
  pageNumber: number = 1;
  recordPerPage: number = 10;
  arrayobj: any[] = [];
  @Input() finYear = "";
  subtitle: string;
  // public apiUrl: string = environment.apiURL;
  tabledata: any;

  gemStockListViewModel = new GemStockListViewModel();
  dailyNoteListViewModelforPrint = new DailyNoteModelsViewModel();
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
    public DailynotesService: DailynotesService,
    private loginService: LoginService,
    public starterService: StarterService,
    private dashboardService: DashboardService,
  ) {
    this.subtitle = "GemStock Report";
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
debugger
    const dailyNoteVM = new GemStockViewModel();
    dailyNoteVM.fromDate = new Date(this.form.value.fromdate);
    dailyNoteVM.finyr = this.form.value.finyr;
    dailyNoteVM.branch = this.form.value.branch;
    dailyNoteVM.pageNumber = this.pageNumber;
    dailyNoteVM.pageSize = this.recordPerPage;
    // dailyNoteVM.pageSize=10
    this.DailynotesService.getAllgemstock(dailyNoteVM).subscribe((res) => {
      this.gemStockListViewModel = res;
    });
  }


 

  getAllDailyNotesforPrint() {
    const dailyNoteVM = new GemStockViewModel();
    dailyNoteVM.fromDate = new Date(this.form.value.fromdate);
    dailyNoteVM.finyr = this.form.value.finyr;
    dailyNoteVM.branch = this.form.value.branch;
    dailyNoteVM.pageNumber = this.pageNumber;
    dailyNoteVM.pageSize = this.recordPerPage;
    // dailyNoteVM.pageSize=10
    this.DailynotesService.getAllgemstock(dailyNoteVM).subscribe((res) => {
      this.gemStockListViewModel = res;
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
  getTotalAmount() {
    // let
    if (this.dailyNoteListViewModelforPrint) {
      return this.dailyNoteListViewModelforPrint.dailyNoteModels.map((t) => {});
    }
    return 0;
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
    XLSX.writeFile(wb, "GemsalesReport.xlsx");
  }

  get GetTotalAxisCCForView(){
    return this.gemStockListViewModel.listGemStock.reduce((acc, curr) => {
      return acc + curr.balance;
    }, 0);
  }
}

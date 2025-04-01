import { GemCmModel } from "./../../../models/gem-cm.model";
import { DailynotesService } from "./../../dailynotes/dailynotes.service";
import { formatDate } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiFiletr } from "src/app/models/api-filetr.model";
import { GoldCmModel } from "src/app/models/gold-cm.model";
import { DashboardService } from "src/app/services/dashboard.service";
import { DailyNoteModelsViewModel } from "../../dailynotes/model/dailynotesmodel";
import {
  BranchListViewModel,
  BranchViewModel,
} from "../../starter/model/branchModel";
import * as XLSX from "xlsx";
@Component({
  templateUrl: "./gem-sales.component.html",
  styleUrls: ["./gem-sales.component.scss"],
})
export class GemSalesComponent {
  dailyNoteListViewModel = new DailyNoteModelsViewModel();
  branchListViewModel = new BranchListViewModel();
  form: FormGroup;

  goldCmModelList: GoldCmModel[] = [];
  gemCmModelList: GemCmModel[] = [];
  isLoading: boolean = false;

  hearders = [
    "Date",
    "Cash Memo",
    "Branch",
    "Customer Name",
    "Customer Address",
    "Customer Phone",
    "Total Amount",
    "Cash",
    "Card",
    "UPI",
    "Voucher",
    "Old Gold",
  ];

  constructor(
    public DailynotesService: DailynotesService,
    private dashboardService: DashboardService
  ) {
    this.getAllBranch();
  }

  ngOnInit() {
    this.form = new FormGroup({
      branch: new FormControl("", Validators.required),
      fromdate: new FormControl(
        formatDate(new Date(), "yyyy-MM-dd", "en"),
        Validators.required
      ),
      enddate: new FormControl(
        formatDate(new Date(), "yyyy-MM-dd", "en"),
        Validators.required
      ),
    });
    // this.getData();
  }
  submit() {
    this.getData();
  }

  getAllBranch() {
    let branchViewModel = new BranchViewModel();
    this.DailynotesService.getAllBarnch(branchViewModel).subscribe((res) => {
      if (res) {
        this.branchListViewModel = res;
        // console.log(this.branchListViewModel)
      }
    });
  }

  getData() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      const startDate = new Date(this.form.value.fromdate);
      const endDate = new Date(this.form.value.enddate);
      const filetr: ApiFiletr = {
        fromDate: startDate,
        toDate: endDate,
        branch:
          this.form.value.branch == null || this.form.value.branch == "null"
            ? null
            : this.form.value.branch,
      };

      //   this.dashboardService.getGemSales(filetr).subscribe((data) => {
      //     this.thisMonthSalesGem = data;
      //   });
      this.dashboardService.getGemSales(filetr).subscribe((data) => {
        // this.gemList = data;
        this.gemCmModelList = data;
        this.isLoading = false;
      });
    }
  }

  onDownload() {
    const table = document.getElementById("printDIV");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Gold Sale.xlsx");
  }

  get TotalAmount(): number {
    return this.gemCmModelList.reduce((a, b) => a + b.taxableAmt, 0);
  }
  get TotalCash(): number {
    return this.gemCmModelList.reduce((a, b) => a + b.cashAmt, 0);
  }
  get TotalCard(): number {
    return this.gemCmModelList.reduce(
      (a, b) => a + Number(b.cCard.split("#")[0]),
      0
    );
  }
  get TotalUpi(): number {
    return this.gemCmModelList.reduce((a, b) => a + b.upi, 0);
  }
  get TotalVoucher(): number {
    return this.gemCmModelList.reduce((a, b) => a + Number(b.gvoucher), 0);
  }
  get TotalOldGold(): number {
    return this.gemCmModelList.reduce((a, b) => a + b.customer, 0);
  }
}

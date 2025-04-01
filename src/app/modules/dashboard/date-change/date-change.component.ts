import { MONTHS_NAME } from "./../../../services/dashboard.service";
import { formatDate } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DashboardService } from "src/app/services/dashboard.service";
import { map, switchMap, take } from "rxjs/operators";
import { LoginService } from "src/app/authentication/login/service/login.service";
import { Subscription } from "rxjs";

@Component({
  selector: "date-change",
  templateUrl: "./date-change.component.html",
  styleUrls: ["./date-change.component.css"],
})
export class DateChangeComponent implements OnInit, OnDestroy {
  @ViewChild("myDrop", { static: true }) myDrop: any;

  @Input() month = "";
  @Input() branch = "";
  @Input() finYear = "";
  @Input() isTestWhite = false;
  @Input() startDate = new Date();
  @Input() endDate = new Date();

  @Input() hideBranch = false;
  @Input() hiteMonth = false;

  @Output() dateChange = new EventEmitter<{
    branch: string;
    month: string;
    finyr: string;
  }>();

  form: FormGroup;

  allBranchs: any[] = [];

  allMonths = MONTHS_NAME;
  currentUser:any
  currentUserSub:Subscription

  finYarn: { finYr: string; dtFrom: string; dtTo: string }[] = [];

  constructor(
    private dashboardService: DashboardService,
    private loginService: LoginService
  ) {}

  ngOnInit() {

   this.currentUserSub =  this.loginService.user$.subscribe(user=> {
      this.currentUser = user
    })
    this.form = new FormGroup({
      branch: new FormControl(this.branch),
      month: new FormControl(this.month),
      finyr: new FormControl(this.finYear),
    });
    this.dashboardService.allBranch$.subscribe((data) => {
      this.allBranchs = data;
    });

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
        this.onSubmit();
      });
  }

  onSubmit() {
    this.dateChange.emit(this.form.value);
    this.myDrop.close();
  }
  ngOnDestroy(): void {
    this.currentUserSub && this.currentUserSub.unsubscribe();
  }
}


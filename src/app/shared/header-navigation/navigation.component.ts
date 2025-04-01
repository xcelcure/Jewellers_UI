import {
  Component,
  AfterViewInit,
  EventEmitter,
  Output,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { LoginService } from "src/app/authentication/login/service/login.service";
import { DashboardService } from "src/app/services/dashboard.service";
import { AuthguardService } from "../authguardservice/authguard.service";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  month = "";
  branch = "";
  finyr = "";
  currentUser: any;
  constructor(
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.loginService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngAfterViewInit() {}
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl("authentication/login");
  }
  onSettings() {
    this.router.navigateByUrl("/settings");
  }

  get Path() {
    return this.router.url;
  }
  dateChange(event) {
    this.month = event.month;
    this.branch = event.branch;
    this.finyr = event.finyr;
    this.dashboardService.dashBoardFilter$.next({
      month: this.month,
      branch: this.branch,
      finyr: this.finyr,
    });
  }
}

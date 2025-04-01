import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
declare var $: any;

import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

@Component({
  selector: "app-full-layout",
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router) {}

  tabStatus = "justified";

  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

  options = {
    theme: "light", // two possible values: light, dark
    dir: "ltr", // two possible values: ltr, rtl
    layout: "vertical", // fixed value. shouldn't be changed.
    sidebartype: "full", // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: "fixed", // two possible values: fixed, absolute
    headerpos: "fixed", // two possible values: fixed, absolute
    boxed: "full", // two possible values: full, boxed
    navbarbg: "skin1", // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: "skin6", // six possible values: skin(1/2/3/4/5/6)
    logobg: "skin6", // six possible values: skin(1/2/3/4/5/6)
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === "/") {
      this.router.navigate(["/"]);
    }
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
    this.ChackingAithorization();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case "full":
      case "iconbar":
        if (this.innerWidth < 1170) {
          this.options.sidebartype = "mini-sidebar";
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      case "overlay":
        if (this.innerWidth < 767) {
          this.options.sidebartype = "mini-sidebar";
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  toggleSidebarType() {
    switch (this.options.sidebartype) {
      case "full":
      case "iconbar":
        this.options.sidebartype = "mini-sidebar";
        break;

      case "overlay":
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case "mini-sidebar":
        if (this.defaultSidebar === "mini-sidebar") {
          this.options.sidebartype = "full";
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  private ChackingAithorization() {
    if (sessionStorage.getItem("token") == null) {
      this.router.navigate(["/authentication/login"]);
    }
    if (sessionStorage.getItem("outTime") != null) {
      let date = new Date(sessionStorage.getItem("outTime"));
      let now = new Date();
      if (now.getTime() >= date.getTime()) {
        this.logout();
      } else {
        const min = this.getMinutesFromFutureDate(date);
        setTimeout(() => {
          this.logout();
        }, this.getMilisecondsFromMinutes(min));
      }
    }
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("outTime");
    this.router.navigate(["/authentication/login"]);
  }

  // get minutes from future date
  getMinutesFromFutureDate(date: Date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return minutes;
  }
  // get miliseconds from munites
  getMilisecondsFromMinutes(minutes: number) {
    const diff = minutes * 60 * 1000;
    return diff;
  }
}

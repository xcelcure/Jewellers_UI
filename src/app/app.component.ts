import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { LoginService } from "./authentication/login/service/login.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(public http: HttpClient, private loginService: LoginService) {}
  ngOnInit() {
    this.loginService.checkAuthentication();
  }
}

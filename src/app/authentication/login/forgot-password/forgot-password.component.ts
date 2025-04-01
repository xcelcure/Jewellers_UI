import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModel } from "../model/loginModel";
import { LoginService } from "../service/login.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  isNotMatch = false;

  errorMessage = "";
  isMessageSuccess = false;
  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  loginForm: FormGroup = this.formBuilder.group({
    Username: [null, [Validators.required]],
  });
  get Username() {
    return this.loginForm.get("Username");
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.isNotMatch = false;
      this.loginService
        .forGotPassword(this.loginForm.get("Username").value)
        .subscribe((res) => {
          debugger;
          this.isMessageSuccess = !res.failure;
          this.errorMessage = res.message;
          this.isLoading = false;
        });
    }
  }
}

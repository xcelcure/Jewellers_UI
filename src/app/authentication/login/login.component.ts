import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginModel } from "./model/loginModel";
import { LoginService } from "./service/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  isLoading = false;
  isNotMatch = false;
  showPassword: boolean = false;
  passwordValue: string = '';
  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private router: Router
  ) {}

  loginForm: FormGroup = this.formBuilder.group({
    Password: [null, [Validators.required]],
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
      let loginModel = new LoginModel();
      loginModel.username = this.loginForm.get("Username").value;
      loginModel.password = this.loginForm.get("Password").value;
      this.loginService.checklogin(loginModel).subscribe((res) => {
        if (!res.failure) {
          sessionStorage.setItem("user_name", res.loginModel.username);
          sessionStorage.setItem("token", res.token);
          const date = new Date();
          date.setMinutes(date.getMinutes() + 28);
          sessionStorage.setItem("outTime", date.toString());
          this.router.navigate(["/"]);
        } else {
          this.isNotMatch = true;
        }
        this.isLoading = false;
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

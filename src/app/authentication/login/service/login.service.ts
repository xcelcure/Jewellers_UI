import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginModel, LoginViewModel } from "./../model/loginModel";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class LoginService {
  apiUrl: string = environment.apiURL;

  private LOGIN_USER = new BehaviorSubject<{
    userName: string;
    email: string;
    role: string;
    brCode: string;
  }>(null);

  user$ = this.LOGIN_USER.asObservable();

  constructor(private http: HttpClient) {}

  checklogin(loginModel: LoginModel) {
    const url = this.apiUrl + "api/Authantication/LogIn";
    return this.http.post<LoginViewModel>(url, loginModel, httpOptions).pipe(
      tap((user) => {
        if (!user.failure) {
          const { username, brCode, role } = user.loginModel;
          this.LOGIN_USER.next({
            userName: username,
            role,
            brCode,
            email: loginModel.username,
          });

          sessionStorage.setItem(
            "user",
            JSON.stringify({
              userName: username,
              role,
              brCode,
              email: loginModel.username,
            })
          );
        }
      })
    );
  }

  forGotPassword(email: string) {
    const url = this.apiUrl + "api/ForgatePassword";
    return this.http.post<LoginViewModel>(
      url,
      {
        user_id: email,
      },
      httpOptions
    );
  }

  checkAuthentication() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.LOGIN_USER.next(JSON.parse(user));
    }
  }
}

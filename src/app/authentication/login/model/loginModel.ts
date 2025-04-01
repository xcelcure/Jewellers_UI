import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class LoginModel {
  public firstName:string
  public lastName:string
  public role:string
  public brCode:string
  public username:string
  public password:string

  constructor() {
    this.username = "";
    this.password = "";
  }
}

export class LoginViewModel extends CommonModel {
  public loginModel: LoginModel;
  constructor() {
    super();
    this.loginModel = new LoginModel();
  }
}

import { UserModel } from "./../models/user.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url = environment.apiURL;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserModel[]>(this.url + "api/user");
  }

  addUser(user: UserModel) {
    return this.http.post(this.url + "api/user/add", user);
  }

  deleteUser(user: UserModel) {
    return this.http.post(this.url + "api/user/delete", user);
  }
}

import { UserModel } from "./../models/user.model";
import { UserService } from "./../services/user.service";
import { Component, AfterViewInit, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { ROUTES } from './menu-items';
// import { RouteInfo } from './settings.metadata';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Branch, DashboardService } from "../services/dashboard.service";
import {
  BranchListViewModel,
  BranchViewModel,
} from "../modules/starter/model/branchModel";
import { DailynotesService } from "../modules/dailynotes/dailynotes.service";
declare var $: any;

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class settingsComponent implements OnInit {
  userList: UserModel[] = [];
  form: FormGroup;
  allBranchs: Branch[];
  branchListViewModel: BranchListViewModel;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private DailynotesService: DailynotesService
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllBranch();
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      role: new FormControl("Admin", Validators.required),
      brCode: new FormControl("", Validators.required),
    });
    this.form.get("role").valueChanges.subscribe((value) => {
      if (value == false || value == "false") {
        this.form.get("brCode").setValidators([Validators.required]);
      } else {
        this.form.get("brCode").clearValidators();
      }
      this.form.get("brCode").updateValueAndValidity();
    });
    this.allUsers();
  }

  getAllBranch() {
    let branchViewModel = new BranchViewModel();
    this.DailynotesService.getAllBarnch(branchViewModel).subscribe((res) => {
      if (res) {
        this.branchListViewModel = res;
      }
    });
  }

  onAddUser(content) {
    const modalRef = this.modalService.open(content, {
      centered: true,
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let isAdmin = this.form.value.role;
      isAdmin = isAdmin == "true" || isAdmin == true;
      let brcode = "";
      if (!isAdmin) {
        brcode = this.form.value.brCode;
      }
      const user = new UserModel(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password,
        isAdmin,
        brcode
      );
      this.userService.addUser(user).subscribe((data) => {
        this.allUsers();
        this.onClose();
      });
    }
  }

  onClose() {
    this.form.reset();
    this.modalService.dismissAll();
  }

  allUsers() {
    this.userService.getAll().subscribe((data) => {
      this.userList = data;
    });
  }

  onDelete(user: UserModel) {
    if (confirm("Do you want to delete this user?")) {
      this.userService.deleteUser(user).subscribe((data) => {
        this.allUsers();
      });
    }
  }
}

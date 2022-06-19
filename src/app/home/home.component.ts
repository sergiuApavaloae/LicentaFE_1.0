import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}
  form: FormGroup;
  wantAuth: boolean = false;
  needLogin: string;
  loginError: boolean = false;
  loggedUser:string = "";
  admin:boolean = false;
  account:boolean = false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required, Validators.maxLength(15)],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
    this.loggedUser = localStorage.getItem("user");
    this.admin = false;
    if (localStorage.getItem("userId") === "13") this.admin = true;
  }
  showAuthentification(): void {
    this.wantAuth = !this.wantAuth;
  }
  
  async addUser() {
    this.apiService
      .createUser({
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password
      })
      .subscribe((res) => {
        this.needLogin = "auth";
      });
  }
  
  async loginUser() {
    this.apiService
      .loginUser({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe(
        (res) => {
          this.loggedUser = res.name;
          localStorage.setItem("userId", res.userId.toString());
          localStorage.setItem("token", res.access_token);
          localStorage.setItem("user", res.name);
          if (res.userId === 13) {
            this.admin = true;
          }
        },
        (err) => {
          this.loginError = true;
        }
      );
  }
  back(): void {
    window.history.back();
  }

  Ar(): void {
    this.router.navigateByUrl("Armode");
  }
  map(): void {
    this.router.navigateByUrl("map");
  }
  test(): void {
    this.apiService.test().subscribe(() => {});
  }
  
  accountDetails(): void {
    this.account = !this.account;
  }
  logOut() {
    this.loggedUser = "";
    localStorage.setItem("userId", "");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    this.admin = false;
  }
}

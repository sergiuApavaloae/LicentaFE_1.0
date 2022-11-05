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
      name: ["",Validators.maxLength(15)],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
    this.loggedUser = localStorage.getItem("user");
    this.admin = false;
    if (localStorage.getItem("user") === "admin") this.admin = true;
  }
  showAuthentication(): void {
    this.wantAuth = !this.wantAuth;
  }
  
  async addUser() {
    if(this.form.valid)
    this.apiService
      .createUser({
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password
      })
      .subscribe((res) => {
        this.wantAuth = false;
      });
  }
  
  async loginUser() {
    this.apiService
      .loginUser({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe(
        (result) => {
          this.loggedUser = result.name;
          localStorage.setItem("userId", result.userId.toString());
          localStorage.setItem("token", result.access_token);
          localStorage.setItem("user", result.name);
          if (result.user === 'admin') {
            this.admin = true;
          }
        },
        (error) => {
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

  goToReports(): void {
    this.router.navigateByUrl("pins");
  }

  goToUsers(): void {
    this.router.navigateByUrl("tabel");
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

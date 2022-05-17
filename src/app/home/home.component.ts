import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(
      private apiService: ApiService,
      private formBuilder: FormBuilder,
      private router:Router,
      public dialog: MatDialog
    ) {

     }
  form: FormGroup;
  wantAuth:boolean=false

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    }
  );
  }
  showAuthentification():void{
    this.wantAuth=!this.wantAuth
  }
  async addUser() {
    this.apiService.createUser({
      name: this.form.value.name,
      email: this.form.value.email,
      password:this.form.value.password
    }).subscribe(res => {
      localStorage.setItem('userId',res.id.toString());
      this.map()
    });

  }
  loginError:boolean=false;
  async loginUser() {
    this.apiService.loginUser({
      email: this.form.value.email,
      password:this.form.value.password
    }).subscribe(res => {
      console.log(res)
      localStorage.setItem('userId',res.userId.toString());
      localStorage.setItem('token',res.access_token);
      this.map()
    },err=>{
      this.loginError=true;
      console.log(err)
    }
    );

  }
  back(): void {
    window.history.back();
  }

  Ar():void{

      this.router.navigateByUrl('Armode');
  }
  map():void{

    this.router.navigateByUrl('map');
}

}

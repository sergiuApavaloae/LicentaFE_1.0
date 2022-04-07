import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(
      private apiService: ApiService,
      private formBuilder: FormBuilder
    ) {

     }
  form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    }
  );
  }
  async addUser() {
    this.apiService.createUser({
      id: 0,
      name: this.form.value.name,
      email: this.form.value.email,
    }).subscribe(res => {
      //this.back();
    });

  }
  back(): void {
    window.history.back();
  }

}

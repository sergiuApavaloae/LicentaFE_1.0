import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder
    ) {}
   
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required]
    }
  );
  }

  async addUser() {
    this.apiService.createUser({
      id: 0,
      name: this.form.value.name,
      email: this.form.value.email,
      password:this.form.value.password
    }).subscribe(res => {
      this.back();
    });

  }
  back(): void {
    window.history.back();
  }

}

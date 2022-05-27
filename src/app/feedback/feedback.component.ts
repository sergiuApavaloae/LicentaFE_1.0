import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor( private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router:Router,) { }

  form: FormGroup;
  wantAuth:boolean=false

  ngOnInit() {
    this.form = this.formBuilder.group({
      feedback: ['', Validators.required],
      rating: ['', Validators.required],
    }
  );
  }

}

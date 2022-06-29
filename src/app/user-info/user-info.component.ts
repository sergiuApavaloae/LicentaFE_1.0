import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private apiService: ApiService,) { }

  userInfo:any
  ngOnInit() {
  this.apiService.getUser(localStorage.getItem('userId')).subscribe(
    (data)=>{
      this.userInfo=data
    }
  )
  }

}

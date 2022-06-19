import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "./shared/article";
import {Observable, pipe, Subject} from "rxjs";
import {tap} from "rxjs/operators";
import { User } from './shared/user';
import { Feedback } from './shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) {   this.API_SERVER = "http://localhost:3000";
}
  //API_SERVER = "https://urban-app-be.herokuapp.com";
  API_SERVER = "";
  private _refreshNeeded=new Subject<void>()
  get refreshNeeded(){
    return this._refreshNeeded;
  }
  
  Url=''
  public test(){
    console.log('TEst')
    this.API_SERVER = "http://localhost:3000";
    console.log(this.API_SERVER)
    return this.httpClient.get<any>(`${this.API_SERVER}/pin/test`) as Observable<any>
  }
  public createFeedback(feedback:Feedback){
    console.log(feedback)
    return this.httpClient.post<any>(`${this.API_SERVER}/feedback`, feedback) as Observable<any>
  }

  public getUser(id:string){
    return this.httpClient.get<User>(`${this.API_SERVER}/user/${id}`)
  }
  public loginUser(user: User):Observable<any>{
    return this.httpClient.post<any>(`${this.API_SERVER}/auth/login`, user) as Observable<any>
  }

  public createUser(user: User){
    return this.httpClient.post<User>(`${this.API_SERVER}/user`, user) as Observable<User>
  }

  public getUserInfo(){
    return this.httpClient.get<any[]>(`${this.API_SERVER}/user/infos`)
  }

  public getPinsInfo(){
    return this.httpClient.get<any[]>(`${this.API_SERVER}/pin/infos`)
  }
}

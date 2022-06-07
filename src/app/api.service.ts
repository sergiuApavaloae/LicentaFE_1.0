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

  constructor(private httpClient:HttpClient) { }
  //API_SERVER = "https://urban-app-be.herokuapp.com";
  API_SERVER = "http://localhost:3000";
  private _refreshNeeded=new Subject<void>()
  get refreshNeeded(){
    return this._refreshNeeded;
  }
  // public readArticles(){
  //   return this.httpClient.get<Article[]>('http://localhost:3000/articles');
  // }
  Url=''
  // public readArticle(id: string){
   
  //   return this.httpClient.get<Article>(`${this.API_SERVER}/articles/${id}`)
  // }
  // public createArticles(article: Article){
  //   return this.httpClient.post<Article>(`${this.API_SERVER}/articles`, article)
  //     .pipe(
  //     tap(()=>{
  //       this._refreshNeeded.next();
  //     })
  //   );
  // }
  public createFeedback(feedback:Feedback){
    console.log(feedback)
    return this.httpClient.post<any>(`${this.API_SERVER}/feedback`, feedback) as Observable<any>
  }

  public getUser(email:string){
    return this.httpClient.get<User>(`${this.API_SERVER}/user/${email}`)
  }
  public loginUser(user: User):Observable<any>{
    console.log(this.API_SERVER)
    return this.httpClient.post<any>(`${this.API_SERVER}/auth/login`, user) as Observable<any>
  }

  public createUser(user: User){
    return this.httpClient.post<User>(`${this.API_SERVER}/user`, user)
      .pipe(
      tap(()=>{
        this._refreshNeeded.next();
      })
    );
  }

  public getUserInfo(){
    return this.httpClient.get<any[]>(`${this.API_SERVER}/user/infos`)
  }

  public getPinsInfo(){
    return this.httpClient.get<any[]>(`${this.API_SERVER}/pin/infos`)
  }

  // public updateArticles(article: Article){
  //   console.log(article.title);
  //   console.log(article.id);
  //   return this.httpClient.put<Article>(`${this.API_SERVER}/articles`,article);
  // }

  // public deleteArticles(id: number){
  //   return this.httpClient.delete(`${this.API_SERVER}/articles/${id}`)
  //   .pipe(
  //     tap(()=>{
  //       this._refreshNeeded.next();
  //     })
  //   );
  // }
}

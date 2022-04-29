import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "./shared/article";
import {Observable, pipe, Subject} from "rxjs";
import {tap} from "rxjs/operators";
import { User } from './shared/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }
  API_SERVER = "https://urban-app-be.herokuapp.com";

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
  public getUser(email:string){
    return this.httpClient.get<User>(`${this.API_SERVER}/user/${email}`)
  }
  public loginUser(user: User):Observable<User>{
    return this.httpClient.post<User>(`http://localhost:3000/auth/login`, user) as Observable<User>
  }

  public createUser(user: User){
    return this.httpClient.post<User>(`http://localhost:3000/user`, user)
      .pipe(
      tap(()=>{
        this._refreshNeeded.next();
      })
    );
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

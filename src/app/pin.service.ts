import { Injectable } from '@angular/core';
import { Pin } from './shared/pin';
import {HttpClient} from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { User } from './shared/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  allPins:any[]=[]
  selectedPin:Pin
  address:string
  //=`https://urban-app-be.herokuapp.com`
  //address='http://localhost:3000'
  constructor(private httpClient:HttpClient) {
    this.address='https://urban-app-be.herokuapp.com'
   }

  private _refreshNeeded=new Subject<number>()
  get refreshNeeded(){
    return this._refreshNeeded;
  }

  addPin(pin:Pin){
    this.allPins.push({
      pin
    })
    return this.httpClient.post<Pin>(`${this.address}/pin`, pin) as Observable<Pin>
  }

  getPins(latitude:number,longitude:number){
   
    return this.httpClient.get<Pin[]>(`${this.address}/pin/${latitude}/${longitude}`) as Observable<Pin[]>
  }

  getPin(pinId:string){
    return this.httpClient.get<Pin>(`${this.address}/pin/${pinId}`) as Observable<Pin>
  
  }

  deletePin(pinId:string){
    return this.httpClient.delete<Pin>(`${this.address}/pin/${pinId}`) as Observable<Pin>
  }

  getUser(pinId:string){
    return this.httpClient.get<User>(`${this.address}/pin/${pinId}/username`) as Observable<User>
   
  }

  getPinInfo(pinId:string){
    return this.httpClient.get<any>(`${this.address}/pin/infos/${pinId}`) as Observable<any>
  }


  setArDestination(pin:Pin){
    this.selectedPin=pin
  }
}

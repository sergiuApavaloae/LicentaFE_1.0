import { Injectable } from '@angular/core';
import { Pin } from './shared/pin';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from './shared/user';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  allPins:any[]=[]
  selectedPin:Pin
  address=`https://urban-app-be.herokuapp.com`
  constructor(private httpClient:HttpClient) { }

  addPin(pin:Pin){
    this.allPins.push({
      pin
    })
    return this.httpClient.post<Pin>('http://localhost:3000/pin', pin) as Observable<Pin>
  }

  getPins(){
    return this.httpClient.get<Pin[]>('http://localhost:3000/pin') as Observable<Pin[]>
  }

  getUser(pinId:string){
    return this.httpClient.get<User>(`http://localhost:3000/pin/${pinId}/username`) as Observable<User>
   
  }


  setArDestination(pin:Pin){
    this.selectedPin=pin
    console.log(this.selectedPin)
  }
}
import { Injectable } from '@angular/core';
import { Pin } from './shared/pin';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  allPins:any[]=[]
  constructor(private httpClient:HttpClient) { }

  addPin(pin:Pin){
    this.allPins.push({
      pin
    })
    console.log(this.allPins)
    console.log(pin)
    return this.httpClient.post<Pin>(`http://localhost:3000/pin`, pin) as Observable<Pin>
  }

  getPins(){
    return this.httpClient.get<Pin[]>(`http://localhost:3000/pin`) as Observable<Pin[]>
  }
}

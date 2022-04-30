import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  allPins:any[]=[]
  constructor() { }

  addPin(lat:any,lng:any){
    this.allPins.push({
      lat,lng
    })
    console.log(this.allPins)
  }
}

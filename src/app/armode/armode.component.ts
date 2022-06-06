import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PinService } from '../pin.service';

@Component({
  selector: 'app-armode',
  templateUrl: './armode.component.html',
  styleUrls: ['./armode.component.css']
})
export class ArmodeComponent implements OnInit {

  constructor(private pinService:PinService,
    private router:Router) { }
  allPins:{lat:any,lng:any}[]=this.pinService.allPins
  string:string
  ngOnInit() {
    // console.log(this.allPins)
    // if(this.allPins)
    if(this.pinService.selectedPin)
    this.string='latitude:' + this.pinService.selectedPin.latitude+'; ' +'longitude:'+this.pinService.selectedPin.longitude
    //this.string='latitude:' + this.allPins[0].lat.toFixed(10)+'; ' +'longitude:'+this.allPins[0].lng.toFixed(10)

    var b = document.querySelector("a-box");

b.setAttribute('gps-entity-place', this.string);

    document.querySelector("button").addEventListener("click", (e)=> {
      console.log('HEREERERER')
      const address='feedback'+'/'+this.pinService.selectedPin.id
      console.log(address)
      this.router.navigateByUrl(address)
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // const address='feedback'+'/'+this.pinService.selectedPin.id
          // console.log(address)
          // this.router.navigateByUrl(address)

        })
      }


    })
  }

}

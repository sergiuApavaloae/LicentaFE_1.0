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
  image:string
  ngOnInit() {
    // console.log(this.allPins)
    // if(this.allPins)
    if(this.pinService.selectedPin)
    this.string='latitude:' + this.pinService.selectedPin.latitude+'; ' +'longitude:'+this.pinService.selectedPin.longitude
    //this.string='latitude:' + this.allPins[0].lat.toFixed(10)+'; ' +'longitude:'+this.allPins[0].lng.toFixed(10)
    var b
    if(this.pinService.selectedPin.image3d==='Sphere')
    this.image='sphere'

    else
      if(this.pinService.selectedPin.image3d==='Cone')
        {this.image='cone'; console.log('con')}
      else
        this.image='box'

    if(this.image=='box')
     b = document.querySelector("a-box");
    if(this.image=='cone')
    b=document.querySelector("a-dodecahedron")
    if(this.image=='sphere')
    b=document.querySelector("a-sphere")


b.setAttribute('gps-entity-place', this.string);

    document.querySelector("mat-raised-button").addEventListener("click", (e)=> {
      console.log('SELECTAT')
      const pin=this.pinService.selectedPin
      this.router.navigateByUrl(`feedback/${pin.id}`)
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("Position");
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const pin=this.pinService.selectedPin
          if(this.getDistanceFromLatLonInKm(latitude,longitude,pin.latitude,pin.longitude)<10){
          console.log("aproape")
          const address='feedback'+'/'+pin.id
          this.router.navigateByUrl(`feedback/${pin.id}`)
          }
          else this.error="eroare"

        })
      }


    })
  }
  error:string
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
   deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}

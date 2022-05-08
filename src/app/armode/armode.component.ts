import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PinService } from '../pin.service';

@Component({
  selector: 'app-armode',
  templateUrl: './armode.component.html',
  styleUrls: ['./armode.component.css']
})
export class ArmodeComponent implements OnInit {

  constructor(private pinService:PinService) { }
  allPins:{lat:any,lng:any}[]=this.pinService.allPins
  string:string
  ngOnInit() {
    // console.log(this.allPins)
    // if(this.allPins)
    this.string='latitude:' + this.pinService.selectedPin.latitude+'; ' +'longitude:'+this.pinService.selectedPin.longitude
    //this.string='latitude:' + this.allPins[0].lat.toFixed(10)+'; ' +'longitude:'+this.allPins[0].lng.toFixed(10)

    var b = document.querySelector("a-box");

b.setAttribute('gps-entity-place', this.string);


    // console.log(this.string)
    //this.string='latitude:44.42817009871623; longitude:26.057101942430'
    // console.log(this.string)
  }

}

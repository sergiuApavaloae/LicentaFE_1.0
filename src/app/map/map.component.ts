import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { PinService } from '../pin.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;

  constructor(private pinService:PinService) { }
  
  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;
  ngOnInit(): void {
    this.setCurrentLocation()
 }
 allPins=[]
  ngAfterViewInit():void{
  const mapProperties = {
    center: new google.maps.LatLng(45.2271, 25.8431),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 15;
    mapProperties.center=new google.maps.LatLng(this.latitude, this.longitude)
  });
}
  this.allPins=this.pinService.allPins
  this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
  this.allPins.forEach((pin)=>{
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pin.lat,
      pin.lng),
      map: this.map
    });
  })
  this.map.addListener("click", (mapsMouseEvent) => {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(mapsMouseEvent.latLng.toJSON().lat,
      mapsMouseEvent.latLng.toJSON().lng),
      map: this.map
    });
    // if(this.allPins.length==2)
    // marker.setMap(null)
    this.pinService.addPin(mapsMouseEvent.latLng.toJSON().lat,
    mapsMouseEvent.latLng.toJSON().lng)
  });
  
 }
 private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 15;
    });
  }
}

  placeMarker(map:google.maps.Map, location:google.maps.LatLng):void {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

}

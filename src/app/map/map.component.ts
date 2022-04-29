import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }
  
  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;
  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(35.2271, -80.8431),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 }
 markers = [
  { lat: 22.33159, lng: 105.63233 },
  { lat: 7.92658, lng: -12.05228 },
  { lat: 48.75606, lng: -118.859 },
  { lat: 5.19334, lng: -67.03352 },
  { lat: 12.09407, lng: 26.31618 },
  { lat: 47.92393, lng: 78.58339 }
];
 ngAfterViewInit():void{
  const mapProperties = {
    center: new google.maps.LatLng(45.2271, 25.8431),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
  this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  this.markers.forEach(location => {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat, location.lng),
      map: this.map
    });
  });
 }

}

import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { PinService } from '../pin.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Pin } from '../shared/pin';
import { DialogReadOnlyComponent } from '../dialog-read-only/dialog-read-only.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;

  constructor(private pinService:PinService,
    public dialog: MatDialog) { }
  
  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;

  actualPin:Pin=new Pin()

  ngOnInit(): void {
 }
 allPins:Pin[]=[]
  async ngAfterViewInit():Promise<void>{
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
this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
  this.pinService.getPins().subscribe(result=>{
    console.log(result)
    this.allPins=result
  this.allPins.forEach((pin)=>{
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(pin.latitude),
        parseFloat(pin.longitude)),
      map: this.map
    });
    marker.addListener("click", () => {
      this.map.setZoom(18);
      this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      console.log("Click")
      this.actualPin=this.getPin(marker.getPosition().lat().toString(),marker.getPosition().lng().toString())
      console.log(this.actualPin)
      this.openReadOnlyDialog()
    });
  })
})
  this.map.addListener("click", (mapsMouseEvent) => {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(mapsMouseEvent.latLng.toJSON().lat,
      mapsMouseEvent.latLng.toJSON().lng),
      map: this.map
    });

    this.actualPin.latitude=mapsMouseEvent.latLng.toJSON().lat.toString();
    this.actualPin.longitude=mapsMouseEvent.latLng.toJSON().lng.toString();
    this.openDialog()

    marker.addListener("click", () => {
      this.map.setZoom(18);
      this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      console.log("Click")
      this.actualPin=this.getPin(marker.getPosition().lat().toString(),marker.getPosition().lng().toString())
      console.log(this.actualPin)
      this.openReadOnlyDialog()
    });
  
  });
  
 }
 getPin(latitude:string,longitude:string){
   console.log(this.allPins)
   for (const pin of this.allPins){
     if(pin.latitude===latitude && pin.longitude===longitude){
       return pin;
     }
   }
 }

openDialog(): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '350px',
    data:{description:this.actualPin.description? this.actualPin.description:"",
        image3d:this.actualPin.image3d?this.actualPin.image3d:"" }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if(result){
    this.actualPin.description=result.description
    this.actualPin.image3d=result.image3d
    
    this.pinService.addPin(this.actualPin).subscribe((result)=>{
      console.log(this.allPins)
        this.allPins.push(this.actualPin)
        console.log(this.allPins)
    })
  }
  });
}

openReadOnlyDialog():void{
  console.log('HEREEE')
  const dialogRef = this.dialog.open(DialogReadOnlyComponent, {
    width: '350px',
    data:{description:this.actualPin.description? this.actualPin.description:"",
        image3d:this.actualPin.image3d?this.actualPin.image3d:"" }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

}

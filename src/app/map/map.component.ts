import { Component, OnInit } from "@angular/core";
import {} from "googlemaps";
import { ViewChild } from "@angular/core";
import { PinService } from "../pin.service";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "../dialog/dialog.component";
import { Pin } from "../shared/pin";
import { DialogReadOnlyComponent } from "../dialog-read-only/dialog-read-only.component";
import { first } from "rxjs/operators";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  actualMarker:any

  mapProperties = {
    center: new google.maps.LatLng(44.42, 26.1),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  constructor(private pinService: PinService, public dialog: MatDialog) {}

  @ViewChild("map", { static: false }) mapElement: any;
  map: google.maps.Map;

  actualPin: Pin = new Pin();
  ngOnInit(): void {}
  allPins: Pin[] = [];
  async ngAfterViewInit(): Promise<void> {
    this.initMap();
    this.getPosition();

    this.pinService.getPins().subscribe((result) => {
      this.allPins = result;
      this.allPins.forEach((pin) => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            parseFloat(pin.latitude),
            parseFloat(pin.longitude)
          ),
          map: this.map,
        });
        marker.addListener("click", () => {
          console.log(pin)
          this.map.setZoom(18);
          this.map.setCenter(marker.getPosition() as google.maps.LatLng);
          this.openReadOnlyDialog(pin);
        });
      });
    });
    this.initMap();
  }
  getPin(latitude: string, longitude: string) {
    for (const pin of this.allPins) {
      if (pin.latitude === latitude && pin.longitude === longitude) {
        return pin;
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "350px",
      data: {
        description:""
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        if(localStorage.getItem('userId')){
          this.actualPin.userId=localStorage.getItem('userId')
        }
        this.actualPin.description = result.description;
        this.actualPin.image3d = result.image3d;
        // this.actualMarker = new google.maps.Marker({
        //   position: new google.maps.LatLng(
        //     parseFloat(this.actualPin.latitude),
        //     parseFloat(this.actualPin.longitude)
        //   ),
        //   map: this.map,
        //   icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
        // });
        this.pinService.addPin(this.actualPin).subscribe((result) => {
          this.actualMarker = new google.maps.Marker({
            position: new google.maps.LatLng(
              parseFloat(this.actualPin.latitude),
              parseFloat(this.actualPin.longitude)
            ),
            map: this.map,
            icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
          });
          this.allPins.push(this.actualPin);
            this.actualMarker.addListener("click", () => {
              this.map.setZoom(18);
              this.map.setCenter(this.actualMarker.getPosition() as google.maps.LatLng);
              this.openReadOnlyDialog(result);
            });
          });
        }
        
      })
}
  
  async getPosition(): Promise<void> {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 17;
        console.log(this.latitude, this.longitude);
        this.mapProperties.center = new google.maps.LatLng(
          this.latitude,
          this.longitude
        );
        this.initMap();
      });
    }
  }
  initMap(): void {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      this.mapProperties
    );
    if (this.latitude) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        map: this.map,
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
      });
    }

    this.map.addListener("click", (mapsMouseEvent) => {
      this.actualPin.latitude = mapsMouseEvent.latLng.toJSON().lat.toString();
      this.actualPin.longitude = mapsMouseEvent.latLng.toJSON().lng.toString();
      this.openDialog()
  })
}

  async openReadOnlyDialog(pin:Pin): Promise<void> {
    let username
    const user=await this.pinService.getUser(pin.id.toString()).pipe(first()).toPromise();
    console.log(username)
    const dialogRef = this.dialog.open(DialogReadOnlyComponent, {
      width: "350px",
      data: {
        description: pin.description
          ? pin.description
          : "",
        image3d: pin.image3d ? pin.image3d : "",
        userName:user.name
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.destination){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            parseFloat(pin.latitude),
            parseFloat(pin.longitude)
          ),
          map: this.map,
          icon:"https://maps.google.com/mapfiles/kml/shapes/library_maps.png"
        });
        this.pinService.setArDestination(pin);
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";
import {} from "googlemaps";
import { ViewChild } from "@angular/core";
import { PinService } from "../pin.service";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "../dialog/dialog.component";
import { Pin, ReportType } from "../shared/pin";
import { DialogReadOnlyComponent } from "../dialog-read-only/dialog-read-only.component";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
 
  public constructor(
    private pinService: PinService,
    public dialog: MatDialog,
    private router: Router
  ) {}  
  latitude: number;
  longitude: number;
  zoom: number;
  actualMarker: any;
  mapProperties = {
    center: new google.maps.LatLng(44.42, 26.1),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  @ViewChild("map", { static: false })
  mapElement: any;
  map: google.maps.Map;
  actualPin: Pin = new Pin();
  allPins: Pin[] = [];
  interval;
  ngOnInit(): void {}
  ngOnDestroy() {
  }
  async ngAfterViewInit(): Promise<void> {
    this.interval = setInterval(() => {
      this.getPins();
    }, 25 * 1000);
    this.initMap();
    this.getPositionAndPins();
    
  }
 
  getPins() {
    this.pinService
      .getPins(this.latitude, this.longitude)
      .subscribe((result) => {
        this.allPins = result;
        this.allPins.forEach((pin) => {
          this.addPinToMap(pin)
        });
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "350px",
      data: {
        description: "",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (localStorage.getItem("userId")) {
          this.actualPin.userId = localStorage.getItem("userId");
        }
        this.actualPin.description = result.description;
        this.actualPin.type=result.type

        this.pinService.addPin(this.actualPin).subscribe(() => {
          this.allPins.push(this.actualPin);
          this.addPinToMap(this.actualPin)
        });
      }
    });
  }

  getPositionAndPins(): void {
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
        this.getPins();
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
        icon: { url: "https://maps.gstatic.com/mapfiles/ms2/micons/man.png" },
      });
    }

    this.map.addListener("click", (mapsMouseEvent) => {
      this.actualPin.latitude = mapsMouseEvent.latLng.toJSON().lat.toString();
      this.actualPin.longitude = mapsMouseEvent.latLng.toJSON().lng.toString();
      this.openDialog();
    });
  }
  back(): void {
    clearInterval(this.interval);
    window.history.back();
  }
  canGoToAR = false;

  addPinToMap(pin:Pin) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        parseFloat(pin.latitude),
        parseFloat(pin.longitude)
      ),
      map: this.map,
      icon:
      pin.type ===ReportType.Animals
      ? {
          url: "https://maps.gstatic.com/mapfiles/ms2/micons/pink-dot.png",
        }
      : pin.type ===ReportType.Beautiful
      ? {
          url: "https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png",
        }
      : pin.type ===ReportType.Traffic? {
          url: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
        }
      :pin.type ===ReportType.Parks?{
        url: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png"
      }:
      pin.type ===ReportType.Salubrity?{
        url: "https://maps.gstatic.com/mapfiles/ms2/micons/purple-dot.png"
      }:
      pin.type===ReportType.Streets?{
        url: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"
      }:
      {
        url: "https://maps.gstatic.com/mapfiles/ms2/micons/ltblue-dot.png"
      }
    });
    marker.addListener("click", () => {
      console.log(pin);
      this.map.setZoom(18);
      this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      this.openReadOnlyDialog(pin);
    });
}

  async openReadOnlyDialog(pin: Pin): Promise<void> {
    let username;
    const user = await this.pinService
      .getUser(pin.id.toString())
      .pipe(first())
      .toPromise();
    const dialogRef = this.dialog.open(DialogReadOnlyComponent, {
      width: "350px",
      data: {
        description: pin.description ? pin.description : "",
        image3d: pin.image3d ? pin.image3d : "",
        userName: user.name,
        pinId:pin.id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.destination === "yes") {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            parseFloat(pin.latitude),
            parseFloat(pin.longitude)
          ),
          map: this.map,
          icon: "https://maps.google.com/mapfiles/kml/shapes/library_maps.png",
        });
        console.log(pin)
        this.pinService.setArDestination(pin);
        this.canGoToAR = true;
      }
    });
  }
  Ar(): void {
    clearInterval(this.interval);
    this.router.navigateByUrl("Armode");
  }
  locateMe(): void {
    this.getPositionAndPins();
  }
}

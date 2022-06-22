import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PinService } from "../pin.service";
import { ReportType } from "../shared/pin";

@Component({
  selector: "app-armode",
  templateUrl: "./armode.component.html",
  styleUrls: ["./armode.component.css"],
})
export class ArmodeComponent implements OnInit {
  constructor(private pinService: PinService, private router: Router) {}
  allPins: { lat: any; lng: any }[] = this.pinService.allPins;
  string: string;
  image: string;
  ngOnInit() {
    if (this.pinService.selectedPin)
      this.string =
        "latitude:" +
        this.pinService.selectedPin.latitude +
        "; " +
        "longitude:" +
        this.pinService.selectedPin.longitude;
    var type = this.pinService.selectedPin.type;
    let b: any;
    if (
      type == ReportType.Animals ||
      type == ReportType.Parks ||
      type == ReportType.Other
    )
      b = document.querySelector("a-box");
    if (
      type == ReportType.Streets ||
      type == ReportType.Traffic ||
      type == ReportType.Salubrity
    )
      b = document.querySelector("a-sphere");
    if (type == ReportType.Beautiful)
      b = document.querySelector("a-dodecahedron");

    b.setAttribute("material", this.getColor(type));
    b.setAttribute("gps-entity-place", this.string);

    document
      .querySelector("mat-raised-button")
      .addEventListener("click", (e) => {
        const pin = this.pinService.selectedPin;
        this.router.navigateByUrl(`feedback/${pin.id}`);
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const pin = this.pinService.selectedPin;
            if (
              this.getDistanceFromLatLonInKm(
                latitude,
                longitude,
                pin.latitude,
                pin.longitude
              ) < 0.1
            ) {
              const address = "feedback" + "/" + pin.id;
              this.router.navigateByUrl(`feedback/${pin.id}`);
            } else this.error = "eroare";
          });
        }
      });
  }
  getColor(type: string) {
    if (type == ReportType.Animals) return "color: pink";
    if (type == ReportType.Beautiful) return "color: yellow";
    if (type == ReportType.Traffic) return "color: blue";
    if (type == ReportType.Streets) return "color: red";
    if (type == ReportType.Parks) return "color: green";
    if (type == ReportType.Salubrity) return "color: purple";
    if (type == ReportType.Other) return "color: blue";
  }
  error: string;
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

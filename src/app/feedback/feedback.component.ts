import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../api.service";
import { PinService } from "../pin.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private pinService: PinService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form: FormGroup;
  pinInfo: any;
  ngOnInit() {
    this.pinService
      .getPinInfo(this.route.snapshot.paramMap.get("pinId"))
      .subscribe((result) =>{
        console.log(result)
        this.pinInfo = result});
    this.form = this.formBuilder.group({
      rating: ["", Validators.required],
    });
  }

  addFeedback() {
    const feedback = {
      userId: localStorage.getItem("userId"),
      pinId: this.route.snapshot.paramMap.get("pinId"),
      id: 0,
      rating: this.form.value.rating,
    };
    this.apiService.createFeedback(feedback).subscribe((feedback) => {
      this.router.navigateByUrl("home");
    });
  }
}

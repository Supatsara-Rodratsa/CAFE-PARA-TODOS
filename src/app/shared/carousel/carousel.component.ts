import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent implements OnInit {
  public screenWidth: any;

  constructor() {}

  ngOnInit(): void {
    let slides = document.querySelectorAll(".slide");
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
  }

  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    console.log(this.screenWidth);
  }
}

import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { interval, Subscription } from 'rxjs';
import { ViewEncapsulation  } from '@angular/core';

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit{
  public screenWidth: number | undefined;
  private slides: NodeListOf<Element> | undefined;
  private circleStatus: NodeListOf<Element> | undefined;
  private slideDeck: Element | undefined;
  private index = 0;
  private prevIndex = 0;
  private height = 450;
  private maximumHeight = 0;
  private subscription: Subscription = new Subscription;
  public renderHTML: string = '';

  constructor() {}

  ngOnInit(): void {
    this.slides = document.querySelectorAll(".slide");
    this.slides.item(0).classList.add("active");
    this.renderCircleStatus();
    this.slideDeck = document.querySelector(".slide-deck") as any;
    this.maximumHeight = (this.slides.length-1) * this.height;
    this.subscription = interval(10000).subscribe(val => this.onClickNextSlide());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 600) {
      this.circleStatus = document.querySelectorAll(".show-bigger-screen .circle");   
    } else {
      this.circleStatus = document.querySelectorAll(".show-smaller-screen .circle");   
    }
    
    this.circleStatus?.item(0).classList.add("active-circle");
  }

  onClickPrevSlide() {
    this.prevIndex = this.index;
    if ( this.slides && this.index == 0) {
      this.index = this.slides.length-1;
    } else {
      this.index--;
    }
    this.switchSlide();
    this.subscription.unsubscribe();
    this.subscription = interval(10000).subscribe(val => this.onClickNextSlide());
  }

  onClickNextSlide() {
    this.prevIndex = this.index;
      const currentHeight = this.index * this.height;
      if (currentHeight == this.maximumHeight) {
        this.index = 0;
      } else {
        this.index++;
      }
      this.switchSlide();
      this.subscription.unsubscribe();
      this.subscription = interval(10000).subscribe(val => this.onClickNextSlide());
  }

  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    if (this.screenWidth && this.screenWidth < 600) {
      this.circleStatus = document.querySelectorAll(".show-smaller-screen .circle");   
    } else {
      this.circleStatus = document.querySelectorAll(".show-bigger-screen .circle");   
    }
    this.circleStatus.item(0).classList.add("active-circle");
  }

  switchSlide() {
    this.slides?.item(this.prevIndex).classList.remove("active");
    this.slides?.item(this.index).classList.add("active");

    this.circleStatus?.item(this.index).classList.add("active-circle");
    this.circleStatus?.item(this.prevIndex).classList.remove("active-circle");

    if (this.index == 0) {
      (this.slideDeck as HTMLElement).style.transform = `${"translateY(0px)"}`;
    } else {
      (this.slideDeck as HTMLElement).style.transform = `${"translateY(-" + this.index * this.height+ "px)"}`;
    }
  }

  renderCircleStatus() {
    this.slides?.forEach(() => this.renderHTML += '<div class="circle"></div>');
  }

}

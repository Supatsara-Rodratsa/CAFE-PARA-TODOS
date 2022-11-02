import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { SafeHtmlPipe } from "./pipe/safeHTMLPipe.pipe";
import { CardComponent } from './card/card.component';
@NgModule({
  declarations: [NavBarComponent, CarouselComponent, SafeHtmlPipe, CardComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [NavBarComponent, CarouselComponent, SafeHtmlPipe, CardComponent],
  entryComponents: [],
  providers: [HttpClient, SafeHtmlPipe]
})
export class SharedModule {
  static forRoot(): any[] {
    return [SharedModule];
  }
}

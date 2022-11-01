import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CarouselComponent } from "./carousel/carousel.component";
@NgModule({
  declarations: [NavBarComponent, CarouselComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [NavBarComponent, CarouselComponent],
  entryComponents: [],
  providers: [HttpClient]
})
export class SharedModule {
  static forRoot(): any[] {
    return [SharedModule];
  }
}

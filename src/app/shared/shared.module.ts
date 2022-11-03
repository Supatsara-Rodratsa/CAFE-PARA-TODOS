import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { SafeHtmlPipe } from "./pipe/safeHTMLPipe.pipe";
import { CardComponent } from './card/card.component';
import { TabCardComponent } from './tab-card/tab-card.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [NavBarComponent, CarouselComponent, SafeHtmlPipe, CardComponent, TabCardComponent, DialogComponent],
    imports: [CommonModule, HttpClientModule, MatDialogModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    exports: [NavBarComponent, CarouselComponent, SafeHtmlPipe, CardComponent, TabCardComponent],
    providers: [HttpClient, SafeHtmlPipe],
    entryComponents: [DialogComponent]
})
export class SharedModule {
  static forRoot(): any[] {
    return [SharedModule];
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactMeComponent } from './Components/contact-me/contact-me.component'
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageMinComponent } from './Components/home-page-min/home-page-min.component';
import { StarBackgroundComponent } from './Components/star-background/star-background.component';



@NgModule({
  declarations: [
    AppComponent,
    ContactMeComponent,
    HomePageMinComponent,
    StarBackgroundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './Components/navigation-bar/navigation-bar.component';
import { HomePageComponent } from './Components/home-page/home-page/home-page.component';
import { AboutMeComponent } from './Components/about-me/about-me.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { ContactMeComponent } from './Components/contact-me/contact-me.component'
import { ReactiveFormsModule } from '@angular/forms';
import { HomePage2Component } from './Components/home-page2/home-page2.component';
import { ThreejsobjComponent } from './Components/threejsobj/threejsobj.component';
import { HomePageMinComponent } from './Components/home-page-min/home-page-min.component';
import { ScrollToTopComponent } from './Components/scroll-to-top/scroll-to-top.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomePageComponent,
    AboutMeComponent,
    PortfolioComponent,
    ContactMeComponent,
    HomePage2Component,
    ThreejsobjComponent,
    HomePageMinComponent,
    ScrollToTopComponent,
    
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

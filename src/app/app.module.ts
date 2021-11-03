import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './Components/navigation-bar/navigation-bar.component';


import { HomePageComponent } from './Components/home-page/home-page/home-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AboutMeComponent } from './Components/about-me/about-me.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { ContactMeComponent } from './Components/contact-me/contact-me.component'



@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomePageComponent,
    AboutMeComponent,
    PortfolioComponent,
    ContactMeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ContactMeComponent } from './Components/contact-me/contact-me.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { AboutMeComponent } from './Components/about-me/about-me.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: AboutMeComponent },
  { path: 'aboutme', component: AboutMeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contactme', component: ContactMeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

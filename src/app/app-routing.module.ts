import { AboutMeComponent } from './Components/about-me/about-me.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: AboutMeComponent },
  { path: 'aboutme', component: AboutMeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageMinComponent } from './Components/home-page-min/home-page-min.component';

const routes: Routes = [
  { path: '', redirectTo:'home',  pathMatch: 'full' },
  { path: 'home', component: HomePageMinComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

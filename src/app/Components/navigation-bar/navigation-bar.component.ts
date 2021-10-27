import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  isActiveAboutMe: boolean = false;
  isActivePortfolio: boolean = false;
  isActiveContactMe: boolean = false;

  constructor(private router: Router) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    if (this.router.url === '/aboutme' || this.router.url === '/') {
      this.isActiveAboutMe = true;
      
    }
  }
}
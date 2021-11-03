import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

isDisabled = false;
runCloseMenu = false;

  constructor(private router: Router) { }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void { 
  }

  toggleMenu() {
    this.isDisabled = !this.isDisabled;
  }
}

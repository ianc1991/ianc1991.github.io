import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

isDisabled = false;
runCloseMenu = false;
dropMenuHidden = false;

  constructor(private router: Router,
              private elementRef: ElementRef
              ) { }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void { 
  }

  toggleMenu() {
    this.isDisabled = !this.isDisabled;
  }

  @HostListener("document:click", ['$event.target'])
  onClick(target: Element) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isDisabled = false;
    }
    
  }


}

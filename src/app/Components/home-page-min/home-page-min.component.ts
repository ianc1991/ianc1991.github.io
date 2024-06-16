import { Component, HostListener, OnInit } from '@angular/core';
import { StarControlService } from 'src/app/Services/star-control.service';

@Component({
  selector: 'app-home-page-min',
  templateUrl: './home-page-min.component.html',
  styleUrls: ['./home-page-min.component.scss'],
})
export class HomePageMinComponent implements OnInit {
  constructor(private starControlService: StarControlService) {}

  windowScrolled = false;
  isMobile = window.innerWidth < 768;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  increaseRotation() {
    this.starControlService.changeRotation(0.0003, 0.0003);
  }

  decreaseRotation() {
    this.starControlService.changeRotation(-0.0003, -0.0003);
  }

  stopRotation() {
    this.starControlService.setRotation(0, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }
}

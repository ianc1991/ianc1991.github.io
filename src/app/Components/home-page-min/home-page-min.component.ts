import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-min',
  templateUrl: './home-page-min.component.html',
  styleUrls: ['./home-page-min.component.scss']
})
export class HomePageMinComponent implements OnInit {

  constructor() { }

  windowScrolled = false;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }
}
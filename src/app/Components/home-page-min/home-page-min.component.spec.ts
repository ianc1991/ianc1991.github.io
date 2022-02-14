import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageMinComponent } from './home-page-min.component';

describe('HomePageMinComponent', () => {
  let component: HomePageMinComponent;
  let fixture: ComponentFixture<HomePageMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

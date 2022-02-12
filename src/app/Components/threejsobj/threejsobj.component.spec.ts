import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsobjComponent } from './threejsobj.component';

describe('ThreejsobjComponent', () => {
  let component: ThreejsobjComponent;
  let fixture: ComponentFixture<ThreejsobjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreejsobjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreejsobjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RSliderComponent } from './r-slider.component';

describe('RSliderComponent', () => {
  let component: RSliderComponent;
  let fixture: ComponentFixture<RSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

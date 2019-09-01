import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RGuestComponent } from './r-guest.component';

describe('RGuestComponent', () => {
  let component: RGuestComponent;
  let fixture: ComponentFixture<RGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

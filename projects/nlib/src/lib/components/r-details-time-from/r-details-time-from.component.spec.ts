import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsTimeFromComponent } from './r-details-time-from.component';

describe('RDetailsTimeFromComponent', () => {
  let component: RDetailsTimeFromComponent;
  let fixture: ComponentFixture<RDetailsTimeFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsTimeFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsTimeFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

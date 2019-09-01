import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsTimeToComponent } from './r-details-time-to.component';

describe('RDetailsTimeToComponent', () => {
  let component: RDetailsTimeToComponent;
  let fixture: ComponentFixture<RDetailsTimeToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsTimeToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsTimeToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

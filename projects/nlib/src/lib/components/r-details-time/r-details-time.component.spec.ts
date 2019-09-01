import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsTimeComponent } from './r-details-time.component';

describe('RDetailsTimeComponent', () => {
  let component: RDetailsTimeComponent;
  let fixture: ComponentFixture<RDetailsTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

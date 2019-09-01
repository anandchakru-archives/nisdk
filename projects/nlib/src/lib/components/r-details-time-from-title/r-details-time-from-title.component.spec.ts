import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsTimeFromTitleComponent } from './r-details-time-from-title.component';

describe('RDetailsTimeFromTitleComponent', () => {
  let component: RDetailsTimeFromTitleComponent;
  let fixture: ComponentFixture<RDetailsTimeFromTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsTimeFromTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsTimeFromTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

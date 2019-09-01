import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsTimeToTitleComponent } from './r-details-time-to-title.component';

describe('RDetailsTimeToTitleComponent', () => {
  let component: RDetailsTimeToTitleComponent;
  let fixture: ComponentFixture<RDetailsTimeToTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsTimeToTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsTimeToTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

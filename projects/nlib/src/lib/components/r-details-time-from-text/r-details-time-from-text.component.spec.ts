import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsTimeFromTextComponent } from './r-details-time-from-text.component';

describe('RDetailsTimeFromTextComponent', () => {
  let component: RDetailsTimeFromTextComponent;
  let fixture: ComponentFixture<RDetailsTimeFromTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsTimeFromTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsTimeFromTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

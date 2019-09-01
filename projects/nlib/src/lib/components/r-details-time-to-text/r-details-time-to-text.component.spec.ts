import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsTimeToTextComponent } from './r-details-time-to-text.component';

describe('RDetailsTimeToTextComponent', () => {
  let component: RDetailsTimeToTextComponent;
  let fixture: ComponentFixture<RDetailsTimeToTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsTimeToTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsTimeToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

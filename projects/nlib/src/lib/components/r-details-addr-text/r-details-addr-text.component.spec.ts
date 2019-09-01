import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsAddrTextComponent } from './r-details-addr-text.component';

describe('RDetailsAddrTextComponent', () => {
  let component: RDetailsAddrTextComponent;
  let fixture: ComponentFixture<RDetailsAddrTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsAddrTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsAddrTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsAddrComponent } from './r-details-addr.component';

describe('RDetailsAddrComponent', () => {
  let component: RDetailsAddrComponent;
  let fixture: ComponentFixture<RDetailsAddrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsAddrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsAddrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

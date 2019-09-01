import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsAddrTitleComponent } from './r-details-addr-title.component';

describe('RDetailsAddrTitleComponent', () => {
  let component: RDetailsAddrTitleComponent;
  let fixture: ComponentFixture<RDetailsAddrTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsAddrTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsAddrTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

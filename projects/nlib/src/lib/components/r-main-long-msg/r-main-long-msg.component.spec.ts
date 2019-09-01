import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMainLongMsgComponent } from './r-main-long-msg.component';

describe('RMainLongMsgComponent', () => {
  let component: RMainLongMsgComponent;
  let fixture: ComponentFixture<RMainLongMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMainLongMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMainLongMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

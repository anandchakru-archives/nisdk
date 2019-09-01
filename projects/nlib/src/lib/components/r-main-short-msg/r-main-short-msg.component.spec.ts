import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMainShortMsgComponent } from './r-main-short-msg.component';

describe('RMainShortMsgComponent', () => {
  let component: RMainShortMsgComponent;
  let fixture: ComponentFixture<RMainShortMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMainShortMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMainShortMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

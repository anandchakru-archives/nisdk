import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDefaultComponent } from './r-default.component';

describe('RDefaultComponent', () => {
  let component: RDefaultComponent;
  let fixture: ComponentFixture<RDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

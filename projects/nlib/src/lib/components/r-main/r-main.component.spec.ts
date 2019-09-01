import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMainComponent } from './r-main.component';

describe('RMainComponent', () => {
  let component: RMainComponent;
  let fixture: ComponentFixture<RMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

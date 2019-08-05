import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlibComponent } from './nlib.component';

describe('NlibComponent', () => {
  let component: NlibComponent;
  let fixture: ComponentFixture<NlibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

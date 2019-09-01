import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RBgComponent } from './r-bg.component';

describe('RBgComponent', () => {
  let component: RBgComponent;
  let fixture: ComponentFixture<RBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

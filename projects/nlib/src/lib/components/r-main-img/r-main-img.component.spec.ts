import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMainImgComponent } from './r-main-img.component';

describe('RMainImgComponent', () => {
  let component: RMainImgComponent;
  let fixture: ComponentFixture<RMainImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMainImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMainImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMainTitleComponent } from './r-main-title.component';

describe('RMainTitleComponent', () => {
  let component: RMainTitleComponent;
  let fixture: ComponentFixture<RMainTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMainTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMainTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

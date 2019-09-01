import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsComponent } from './r-details.component';

describe('RDetailsComponent', () => {
  let component: RDetailsComponent;
  let fixture: ComponentFixture<RDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

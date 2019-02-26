import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingPage } from './driving.page';

describe('DrivingPage', () => {
  let component: DrivingPage;
  let fixture: ComponentFixture<DrivingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

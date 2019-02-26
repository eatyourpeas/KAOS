import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingTimesPage } from './visiting-times.page';

describe('VisitingTimesPage', () => {
  let component: VisitingTimesPage;
  let fixture: ComponentFixture<VisitingTimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitingTimesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitingTimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

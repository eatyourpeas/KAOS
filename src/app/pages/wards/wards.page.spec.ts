import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardsPage } from './wards.page';

describe('WardsPage', () => {
  let component: WardsPage;
  let fixture: ComponentFixture<WardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

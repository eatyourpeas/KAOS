import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GangsPage } from './gangs.page';

describe('GangsPage', () => {
  let component: GangsPage;
  let fixture: ComponentFixture<GangsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GangsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GangsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

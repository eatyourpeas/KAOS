import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsPage } from './drugs.page';

describe('DrugsPage', () => {
  let component: DrugsPage;
  let fixture: ComponentFixture<DrugsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

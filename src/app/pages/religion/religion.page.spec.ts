import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionPage } from './religion.page';

describe('ReligionPage', () => {
  let component: ReligionPage;
  let fixture: ComponentFixture<ReligionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

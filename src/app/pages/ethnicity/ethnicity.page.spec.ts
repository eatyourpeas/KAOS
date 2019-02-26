import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicityPage } from './ethnicity.page';

describe('EthnicityPage', () => {
  let component: EthnicityPage;
  let fixture: ComponentFixture<EthnicityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthnicityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthnicityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

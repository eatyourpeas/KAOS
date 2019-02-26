import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentPage } from './consent.page';

describe('ConsentPage', () => {
  let component: ConsentPage;
  let fixture: ComponentFixture<ConsentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

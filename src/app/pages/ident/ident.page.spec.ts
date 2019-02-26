import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentPage } from './ident.page';

describe('IdentPage', () => {
  let component: IdentPage;
  let fixture: ComponentFixture<IdentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

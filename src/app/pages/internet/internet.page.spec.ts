import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetPage } from './internet.page';

describe('InternetPage', () => {
  let component: InternetPage;
  let fixture: ComponentFixture<InternetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

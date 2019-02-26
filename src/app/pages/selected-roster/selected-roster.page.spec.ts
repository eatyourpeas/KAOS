import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRosterPage } from './selected-roster.page';

describe('SelectedRosterPage', () => {
  let component: SelectedRosterPage;
  let fixture: ComponentFixture<SelectedRosterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedRosterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedRosterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

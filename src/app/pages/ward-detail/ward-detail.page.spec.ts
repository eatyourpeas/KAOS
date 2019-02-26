import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardDetailPage } from './ward-detail.page';

describe('WardDetailPage', () => {
  let component: WardDetailPage;
  let fixture: ComponentFixture<WardDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

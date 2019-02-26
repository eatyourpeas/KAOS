import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkThroughPage } from './walk-through.page';

describe('WalkThroughPage', () => {
  let component: WalkThroughPage;
  let fixture: ComponentFixture<WalkThroughPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkThroughPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkThroughPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersPage } from './team-members.page';

describe('TeamMembersPage', () => {
  let component: TeamMembersPage;
  let fixture: ComponentFixture<TeamMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

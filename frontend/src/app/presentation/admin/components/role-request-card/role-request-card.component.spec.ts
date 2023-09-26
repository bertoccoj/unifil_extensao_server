import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRequestCardComponent } from './role-request-card.component';

describe('RoleRequestCardComponent', () => {
  let component: RoleRequestCardComponent;
  let fixture: ComponentFixture<RoleRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

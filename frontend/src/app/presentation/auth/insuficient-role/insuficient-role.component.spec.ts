import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuficientRoleComponent } from './insuficient-role.component';

describe('InsuficientRoleComponent', () => {
  let component: InsuficientRoleComponent;
  let fixture: ComponentFixture<InsuficientRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuficientRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuficientRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

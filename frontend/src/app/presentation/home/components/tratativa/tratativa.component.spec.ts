import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratativaComponent } from './tratativa.component';

describe('TratativaComponent', () => {
  let component: TratativaComponent;
  let fixture: ComponentFixture<TratativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

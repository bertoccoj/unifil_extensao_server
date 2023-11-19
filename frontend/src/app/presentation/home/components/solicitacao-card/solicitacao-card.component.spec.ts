import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoCardComponent } from './solicitacao-card.component';

describe('SolicitacaoCardComponent', () => {
  let component: SolicitacaoCardComponent;
  let fixture: ComponentFixture<SolicitacaoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

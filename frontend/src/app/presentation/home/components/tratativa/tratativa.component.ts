import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { statusSolicitacaoText, tipoSolicitacaoText } from '../../../../application/core/const/text';
import { SolicitacaoDetailsState } from '../../../../application/solicitacao/details/solicitacao-details.reducer';
import { selectSolicitacoesDetails, selectSolicitacoesDetailsLoading } from '../../../../application/solicitacao/details/solicitacao-details.selectors';
import { SolicitacaoActions } from '../../../../application/solicitacao/solicitacao.actions';
import { selectTratativaLoading } from '../../../../application/solicitacao/tratativa/tratativa.selectors';
import { Environment } from '../../../../core/common/config-reader.service';
import { AddTratativaSolicitacaoPayload, EStatusSolicitacao, ETipoSolicitacao, Solicitacao } from '../../../../domain/solicitacoes/solicitacao';

@Component({
  selector: 'ngx-tratativa',
  templateUrl: './tratativa.component.html',
  styleUrls: ['./tratativa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TratativaComponent implements OnInit {

  isLoadingDetails$: Observable<boolean>;
  isLoadingTratativa$: Observable<boolean>;
  details$: Observable<Solicitacao>;
  id: Solicitacao['id'];

  mensagem?: string;
  novoStatus?: { label: string, value: EStatusSolicitacao };
  dataReparo?: Date;

  constructor(
    private store: Store<SolicitacaoDetailsState>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.isLoadingDetails$ = this.store.select(selectSolicitacoesDetailsLoading);
    this.isLoadingTratativa$ = this.store.select(selectTratativaLoading);
    this.details$ = this.store.select(selectSolicitacoesDetails);
    this.store.dispatch(SolicitacaoActions.loadDetails({ id: this.id }));
  }

  getTipoText(tipo: ETipoSolicitacao) {
    return tipoSolicitacaoText[tipo];
  }

  getStatusText(status: EStatusSolicitacao) {
    return statusSolicitacaoText[status];
  }

  getFotoUrl(details: Solicitacao) {
    return Environment.getStaticUrl(
      'fotos', 'solicitacoes', `${details.id}.${details.extensaoArquivo}`,
    )
  }

  getSelectParamStatus(atual: EStatusSolicitacao) {
    return {
      label: 'Novo Status',
      placeholder: 'Selecione',
      options: [
        EStatusSolicitacao.aguardandoAnalise,
        EStatusSolicitacao.aguardandoReparo,
        EStatusSolicitacao.reparoRecusado,
        EStatusSolicitacao.concluido,
      ].filter(s => s != atual)
        .map(s => ({ label: statusSolicitacaoText[s], value: s, })),
    };
  }

  valid() {
    return Object.values([this.mensagem, this.novoStatus, this.dataReparo]).some(Boolean);
  }

  addTratativa(details: Solicitacao) {
    const payload: AddTratativaSolicitacaoPayload = {
      dataReparo: this.dataReparo?.toISOString(),
      mensagem: this.mensagem,
      novoStatus: this.novoStatus?.value,
      solicitacaoId: details.id,
    }
    this.store.dispatch(SolicitacaoActions.addTratativa(payload));
  }
}

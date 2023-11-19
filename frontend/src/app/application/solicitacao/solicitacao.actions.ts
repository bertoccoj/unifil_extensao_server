import { createAction, props } from '@ngrx/store';
import { IFailure } from '../../domain/core/i-failure';
import { AddTratativaSolicitacaoPayload, Solicitacao } from '../../domain/solicitacoes/solicitacao';

export abstract class SolicitacaoActions {
    static loadSolicitacoes = createAction('loadSolicitacoes');
    static loadSolicitacoesSuccess = createAction('loadSolicitacoesSuccess', props<{ solicitacoes: Solicitacao[] }>());
    static loadSolicitacoesFailed = createAction('loadSolicitacoesFailed', props<IFailure>());

    static loadDetails = createAction('loadDetails', props<Pick<Solicitacao, 'id'>>());
    static loadDetailsSuccess = createAction('loadDetailsSuccess', props<Solicitacao>());
    static loadDetailsFailed = createAction('loadDetailsFailed', props<IFailure>());

    static addTratativa = createAction('addTratativa', props<AddTratativaSolicitacaoPayload>());
    static addTratativaSuccess = createAction('addTratativaSuccess', props<{ id: Solicitacao['id'] }>());
    static addTratativaFailed = createAction('addTratativaFailed', props<IFailure>());

}

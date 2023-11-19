import { createReducer, on } from '@ngrx/store';
import { IFailure } from '../../../domain/core/i-failure';
import { Solicitacao } from '../../../domain/solicitacoes/solicitacao';
import { SolicitacaoActions } from '../solicitacao.actions';

export class SolicitacaoListState {
    solicitacoes: Solicitacao[];
    isLoading: boolean = false;
    failure: IFailure = null;
}

export const solicitacaoListReducer = createReducer(
    new SolicitacaoListState(),
    on(
        SolicitacaoActions.loadSolicitacoes,
        (state) => ({
            ...state,
            isLoading: false,
            failure: null,
        }),
    ),
    on(
        SolicitacaoActions.loadSolicitacoesFailed,
        (state, action) => ({
            ...state,
            isLoading: false,
            failure: action,
        }),
    ),
    on(
        SolicitacaoActions.loadSolicitacoesSuccess,
        (state, action) => ({
            ...state,
            isLoading: false,
            solicitacoes: action.solicitacoes,
        }),
    ),
);
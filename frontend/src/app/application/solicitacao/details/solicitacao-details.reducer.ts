import { createReducer, on } from '@ngrx/store';
import { IFailure } from '../../../domain/core/i-failure';
import { Solicitacao } from '../../../domain/solicitacoes/solicitacao';
import { SolicitacaoActions } from '../solicitacao.actions';

export class SolicitacaoDetailsState {
    solicitacao: Solicitacao;
    isLoading: boolean = false;
    failure: IFailure = null;
}

export const solicitacaoDetailsReducer = createReducer(
    new SolicitacaoDetailsState(),
    on(
        SolicitacaoActions.loadDetails,
        (state) => ({
            ...state,
            isLoading: false,
            failure: null,
        }),
    ),
    on(
        SolicitacaoActions.loadDetailsFailed,
        (state, action) => ({
            ...state,
            isLoading: false,
            failure: action,
        }),
    ),
    on(
        SolicitacaoActions.loadDetailsSuccess,
        (state, action) => ({
            ...state,
            isLoading: false,
            solicitacao: action,
        }),
    ),
);
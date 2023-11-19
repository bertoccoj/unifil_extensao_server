import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pluck } from '../../../core/utils/array-high-order-functions';
import { SolicitacaoListState } from './solicitacao-list.reducer';

const solicitacaoListSelector = createFeatureSelector<SolicitacaoListState>('solicitacao-list');

export const selectSolicitacoesList = createSelector(
    solicitacaoListSelector,
    pluck('solicitacoes'),
);

export const selectSolicitacoesListLoading = createSelector(
    solicitacaoListSelector,
    pluck('isLoading'),
);

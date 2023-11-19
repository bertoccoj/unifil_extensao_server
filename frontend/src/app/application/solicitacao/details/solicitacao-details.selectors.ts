import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pluck } from '../../../core/utils/array-high-order-functions';
import { SolicitacaoDetailsState } from './solicitacao-details.reducer';

const solicitacaoDetailsSelector = createFeatureSelector<SolicitacaoDetailsState>('solicitacao-details');

export const selectSolicitacoesDetails = createSelector(
    solicitacaoDetailsSelector,
    pluck('solicitacao'),
);

export const selectSolicitacoesDetailsLoading = createSelector(
    solicitacaoDetailsSelector,
    pluck('isLoading'),
);

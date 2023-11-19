import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pluck } from '../../../core/utils/array-high-order-functions';
import { TratativaState } from './tratativa.reducer';

const tratativaSelector = createFeatureSelector<TratativaState>('solicitacao-tratativa');

export const selectTratativaLoading = createSelector(
    tratativaSelector,
    pluck('isLoading'),
);

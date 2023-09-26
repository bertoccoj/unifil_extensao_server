import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pluck } from '../../core/utils/array-high-order-functions';
import { AuthState } from './auth.state';

const authSelector = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  authSelector,
  pluck('user'),
);

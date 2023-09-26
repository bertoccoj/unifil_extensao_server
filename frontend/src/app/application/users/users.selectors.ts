import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pluck } from '../../core/utils/array-high-order-functions';
import { UsersState } from './users.state';

const usersSelector = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
    usersSelector,
    pluck('users'),
);

export const selectUsersisLoading = createSelector(
    usersSelector,
    pluck('isLoading'),
);

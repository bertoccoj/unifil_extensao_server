import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { UsersState } from './users.state';

export const initialState = new UsersState();

export const usersReducer = createReducer(
    initialState,

    on(
        UsersActions.requestRole,
        (state) => ({
            ...state,
            isLoading: true,
            failure: null,
            users: null,
        }),
    ),
    on(
        UsersActions.requestRoleSuccess,
        (state) => ({
            ...state,
            isLoading: false,
            failure: null,
        }),
    ),
    on(
        UsersActions.requestRoleFailed,
        (state, action) => ({
            ...state,
            isLoading: false,
            failure: action.failure,
        }),
    ),

    on(
        UsersActions.getUsersWithPendingRoleRequest,
        UsersActions.getAllUsers,
        (state) => ({
            ...state,
            isLoading: true,
            failure: null,
            users: null,
        }),
    ),
    on(
        UsersActions.getUsersWithPendingRoleRequestSuccess,
        UsersActions.getAllUsersSuccess,
        (state, action) => ({
            ...state,
            isLoading: false,
            failure: null,
            users: action.users,
        }),
    ),
    on(
        UsersActions.getUsersWithPendingRoleRequestFailed,
        UsersActions.getAllUsersFailed,
        (state, action) => ({
            ...state,
            isLoading: false,
            users: null,
            failure: action.failure,
        }),
    ),
);

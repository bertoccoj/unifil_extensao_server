import { createReducer, on } from '@ngrx/store';
import { IFailure } from '../../../domain/core/i-failure';
import { SolicitacaoActions } from '../solicitacao.actions';

export class TratativaState {
    isLoading: boolean = false;
    failure: IFailure = null;
}

export const tratativaReducer = createReducer(
    new TratativaState(),
    on(
        SolicitacaoActions.addTratativa,
        (state) => ({
            ...state,
            isLoading: true,
            failure: null,
        }),
    ),
    on(
        SolicitacaoActions.addTratativaFailed,
        (state, action) => ({
            ...state,
            isLoading: false,
            failure: action,
        }),
    ),
    on(
        SolicitacaoActions.addTratativaSuccess,
        (state) => ({
            ...state,
            isLoading: false,
            failure: null,
        }),
    ),
);
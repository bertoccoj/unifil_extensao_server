import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { mapEither } from '../../../core/utils/rxjs-operators';
import { ISolicitacaoRepository } from '../../../domain/solicitacoes/i-solicitacao-repository';
import { SolicitacaoActions } from '../solicitacao.actions';

@Injectable()
export class SolicitacaoListEffect {

    index$ = createEffect(() => this.actions$.pipe(
        ofType(
            SolicitacaoActions.loadSolicitacoes,
        ),
        switchMap(() => from(this.solicitacaoRepository.index())),
        mapEither(
            (failure) => SolicitacaoActions.loadSolicitacoesFailed(failure),
            (solicitacoes) => SolicitacaoActions.loadSolicitacoesSuccess({ solicitacoes }),
        ),
    ));

    failToast$ = createEffect(() => this.actions$.pipe(
        ofType(
            SolicitacaoActions.loadSolicitacoesFailed,
        ),
        tap((action) => {
            this.toastService.danger(action.description, action.title);
        }),
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private solicitacaoRepository: ISolicitacaoRepository,
        private toastService: NbToastrService,
    ) { }
}
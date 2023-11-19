import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { mapEither } from '../../../core/utils/rxjs-operators';
import { ISolicitacaoRepository } from '../../../domain/solicitacoes/i-solicitacao-repository';
import { SolicitacaoActions } from '../solicitacao.actions';

@Injectable()
export class SolicitacaoDetailsEffect {

    details$ = createEffect(() => this.actions$.pipe(
        ofType(
            SolicitacaoActions.loadDetails,
            SolicitacaoActions.addTratativaSuccess,
        ),
        switchMap((action) => from(this.solicitacaoRepository.details(action.id))),
        mapEither(
            (failure) => SolicitacaoActions.loadDetailsFailed(failure),
            (solicitacao) => SolicitacaoActions.loadDetailsSuccess(solicitacao),
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

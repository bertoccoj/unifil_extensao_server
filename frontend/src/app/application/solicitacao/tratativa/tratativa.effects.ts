import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { mapEither } from '../../../core/utils/rxjs-operators';
import { ISolicitacaoRepository } from '../../../domain/solicitacoes/i-solicitacao-repository';
import { SolicitacaoActions } from '../solicitacao.actions';

@Injectable()
export class TratativaEffects {

    details$ = createEffect(() => this.actions$.pipe(
        ofType(
            SolicitacaoActions.addTratativa,
        ),
        switchMap((action) => from(this.solicitacaoRepository.addTratativa(action))),
        mapEither(
            (failure) => SolicitacaoActions.addTratativaFailed(failure),
            (r) => SolicitacaoActions.addTratativaSuccess(r),
        ),
    ));

    failToast$ = createEffect(() => this.actions$.pipe(
        ofType(
            SolicitacaoActions.addTratativaFailed,
        ),
        tap((action) => {
            this.toastService.danger(action.description, action.title);
        }),
    ), { dispatch: false });

    successToast$ = createEffect(() => this.actions$.pipe(
        ofType(
            SolicitacaoActions.addTratativaSuccess,
        ),
        tap((action) => {
            this.toastService.success(
                {
                    [SolicitacaoActions.addTratativaSuccess.type]: 'Tratativa adicionada',
                }[action.type],
                'Sucesso',
            );
        }),
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private solicitacaoRepository: ISolicitacaoRepository,
        private toastService: NbToastrService,
    ) { }
}

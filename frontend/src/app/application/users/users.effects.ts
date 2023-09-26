import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { mapEither } from '../../core/utils/rxjs-operators';
import { IUsersFacade } from '../../domain/users/i-users-facade';
import { selectUser } from '../auth/auth.selectors';
import { AuthState } from '../auth/auth.state';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffects {

    requestRole$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.requestRole),
        mergeMap((action) => of(action).pipe(
            withLatestFrom(
                this.store.select(selectUser)
            ),
        )),
        switchMap(([action, user]) => this.usersFacade.requestRole(action)),
        mapEither(
            (l) => UsersActions.requestRoleFailed({ failure: l }),
            (_) => UsersActions.requestRoleSuccess()
        ),
    ));

    sendUserRoleDecision$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.sendUserRoleDecision),
        switchMap((action) => from(this.usersFacade.sendUserRoleDecision(action.userId, action.accept))),
        mapEither(
            (l) => UsersActions.sendUserRoleDecisionFailed({ failure: l }),
            (_) => UsersActions.sendUserRoleDecisionSuccess()
        ),
    ));

    getAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(
            UsersActions.getAllUsers,
            UsersActions.sendUserRoleDecisionSuccess,
        ),
        switchMap(() => from(this.usersFacade.getAllUsers())),
        mapEither(
            (failure) => UsersActions.getAllUsersFailed({ failure }),
            (users) => UsersActions.getAllUsersSuccess({ users }),
        ),
    ));

    getUsersWithPendingRoleRequest$ = createEffect(() => this.actions$.pipe(
        ofType(
            UsersActions.getUsersWithPendingRoleRequest,
            UsersActions.sendUserRoleDecisionSuccess,
        ),
        switchMap(() => from(this.usersFacade.getUsersWithPendingRoleRequest())),
        mapEither(
            (failure) => UsersActions.getUsersWithPendingRoleRequestFailed({ failure }),
            (users) => UsersActions.getUsersWithPendingRoleRequestSuccess({ users }),
        ),
    ));

    failToast$ = createEffect(() => this.actions$.pipe(
        ofType(
            UsersActions.getUsersWithPendingRoleRequestFailed,
            UsersActions.getAllUsersFailed,
            UsersActions.requestRoleFailed,
            UsersActions.sendUserRoleDecisionFailed,
        ),
        tap((action) => {
            this.toastService.danger(action.failure.description, action.failure.title);
        }),
    ), { dispatch: false });

    success$ = createEffect(() => this.actions$.pipe(
        ofType(
            UsersActions.requestRoleSuccess,
            UsersActions.sendUserRoleDecisionSuccess,
        ),
        tap((action) => {
            this.toastService.success(
                {
                    [UsersActions.requestRoleSuccess.type]: 'Permissão solicitada',
                    [UsersActions.sendUserRoleDecisionSuccess.type]: 'Desisão salva',
                }[action.type],
                'Sucesso',
            );
        }),
    ), { dispatch: false });

    constructor(
        private store: Store<AuthState>,
        private actions$: Actions,
        private usersFacade: IUsersFacade,
        private toastService: NbToastrService,
    ) { }

}

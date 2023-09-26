import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersActions } from '../../../../application/users/users.actions';
import { selectUsers, selectUsersisLoading } from '../../../../application/users/users.selectors';
import { UsersState } from '../../../../application/users/users.state';
import { User } from '../../../../domain/auth/user';
import { DialogService } from '../../../core/dialogs/dialog.service';

@Component({
  selector: 'ngx-role-request',
  templateUrl: './role-request.component.html',
  styleUrls: ['./role-request.component.scss']
})
export class RoleRequestComponent implements OnInit {

  isLoading$: Observable<boolean>;
  users$: Observable<User[]>;

  constructor(
    private store: Store<UsersState>,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectUsersisLoading);
    this.users$ = this.store.select(selectUsers);
    this.store.dispatch(UsersActions.getUsersWithPendingRoleRequest());
  }

  async onDecisionAboutUser(user: User, accept: boolean) {
    const message = accept
      ? `Tem certeza que deseja alterar o cargo do usuário "${user.displayName} | ${user.email}" de ${user.role} para ${user.requestedRole}?`
      : `Tem certeza que deseja a solicitação de alteração de cargo do usuário "${user.displayName} | ${user.email}" de ${user.role} para ${user.requestedRole}?`;
    const confirmation = await this.dialogService.confirmation(
      'Confirmação',
      message,
    );
    if (!confirmation) {
      return;
    }
    this.store.dispatch(UsersActions.sendUserRoleDecision({ userId: user.id, accept }));
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersActions } from '../../../application/users/users.actions';
import { selectUsersisLoading } from '../../../application/users/users.selectors';
import { UsersState } from '../../../application/users/users.state';
import { EUserRole } from '../../../domain/auth/user';

@Component({
  selector: 'ngx-insuficient-role',
  templateUrl: './insuficient-role.component.html',
  styleUrls: ['./insuficient-role.component.scss']
})
export class InsuficientRoleComponent {

  requiredRole: EUserRole;
  isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<UsersState>,
  ) {
    this.requiredRole = this.activatedRoute.snapshot.queryParamMap.get('requiredRole') as EUserRole;
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectUsersisLoading);
  }

  requestPermission() {
    this.store.dispatch(UsersActions.requestRole({ role: this.requiredRole }));
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../domain/auth/user';

@Component({
  selector: 'ngx-role-request-card',
  templateUrl: './role-request-card.component.html',
  styleUrls: ['./role-request-card.component.scss']
})
export class RoleRequestCardComponent {

  @Input() user: User;
  @Output() onDesicionMade = new EventEmitter<{ accept: boolean }>();

}

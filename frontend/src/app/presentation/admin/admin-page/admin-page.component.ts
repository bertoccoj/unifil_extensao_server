import { Component } from '@angular/core';
import { MENU_ITEMS } from './menu-items';

@Component({
  selector: 'ngx-admin-page',
  template: `
    <ngx-one-column-layout [showSearchBar]="false">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  menu = MENU_ITEMS;

}

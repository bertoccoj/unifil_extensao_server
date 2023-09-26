import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header [showMenuToggle]="showMenuToggle" [showSearchBar]="showSearchBar"></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" [responsive]="responsiveSideBar" *ngIf="showSideBar" #sidebar>
        <ng-content select="nb-menu"></ng-content>
        <ng-content select="[sidebarContent]"></ng-content>
      </nb-sidebar>

      <nb-layout-column [class]="ngLayoutClasses">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed *ngIf="showFooter">
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  @Input()
  showSideBar = true;

  @Input()
  responsiveSideBar = true;

  @Input()
  showMenuToggle = true;

  @Input()
  showSearchBar = true;

  @Input()
  showFooter = false;

  @Input()
  ngLayoutClasses = '';

}

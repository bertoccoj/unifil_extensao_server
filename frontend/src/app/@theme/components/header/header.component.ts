import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AuthActions } from '../../../application/auth/auth.actions';
import { selectUser } from '../../../application/auth/auth.selectors';
import { AuthState } from '../../../application/auth/auth.state';
import { keyEquals } from '../../../core/utils/array-high-order-functions';
import { LayoutService } from '../../../core/utils/layout.service';
import { User } from '../../../domain/auth/user';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input()
  showMenuToggle = true;

  @Input()
  showSearchBar = true;

  backofficeUserOptions = [
    { title: 'Log out' },
  ];

  adminUserOptions = [
    { title: 'Admin Panel' },
    ...this.backofficeUserOptions,
  ]

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user$: Observable<User>;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'cosmic';

  canViewAdminPannel$: Observable<boolean>;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    private store: Store<AuthState>,
    private acessChecker: NbAccessChecker,
  ) {
    this.acessChecker.isGranted('view', 'admin-panel');
  }

  setupTheme() {
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnInit() {
    this.setupTheme();
    this.currentTheme = this.themeService.currentTheme;
    this.user$ = this.store.select(selectUser);
    this.canViewAdminPannel$ = this.acessChecker.isGranted('view', 'admin-panel');

    this.store.dispatch(AuthActions.loadUser());

    this.menuService.onItemClick().pipe(
      filter((keyEquals('tag', 'profile-picture-menu'))),
      map(({ item: { title } }) => title),
      withLatestFrom(this.user$)
    ).subscribe(([title]) => {
      switch (title) {
        case 'Admin Panel': {
          this.router.navigate(['/admin']);
          break;
        }
        case 'Log out': {
          this.store.dispatch(AuthActions.logOut());
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    return false;
  }

  navigateAdminPanel() {
    this.router.navigateByUrl('/admin');
  }

}

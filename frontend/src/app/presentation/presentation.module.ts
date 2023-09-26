import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSpinnerModule, NbStepperModule, NbTagModule, NbToggleModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../@theme/theme.module';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { RoleRequestCardComponent } from './admin/components/role-request-card/role-request-card.component';
import { RoleRequestComponent } from './admin/components/role-request/role-request.component';
import { UserListComponent } from './admin/components/user-list/user-list.component';
import { InsuficientRoleComponent } from './auth/insuficient-role/insuficient-role.component';
import { ConfirmationDialogComponent } from './core/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from './core/dialogs/dialog.service';
import { WarningDialogComponent } from './core/dialogs/warning-dialog/warning-dialog.component';
import { PresentationRoutingModule } from './presentation.routing.module';

const components = [
  ConfirmationDialogComponent,
  WarningDialogComponent,
  AdminPageComponent,
  InsuficientRoleComponent,
  RoleRequestComponent,
  UserListComponent,
  RoleRequestCardComponent,
];

@NgModule({
  imports: [
    PresentationRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    NbDialogModule.forChild(),
    NbStepperModule,
    ReactiveFormsModule,
    NbWindowModule.forChild(),
    MatCardModule,
    MatInputModule,
    FormsModule,
    NbSidebarModule,
    NbTagModule,
    NbSpinnerModule,
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbActionsModule,
    Ng2SmartTableModule,
    NbToggleModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  providers: [
    DialogService,
  ]
})
export class PresentationModule {
}

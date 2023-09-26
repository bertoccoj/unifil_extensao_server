import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSpinnerModule, NbStepperModule, NbTagModule, NbToggleModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        HomeRoutingModule,
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
        HomeComponent,
    ],
    exports: [
        HomeComponent,
    ],
})
export class HomeModule { }
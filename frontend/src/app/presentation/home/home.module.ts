import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbStepperModule, NbTagModule, NbToggleModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './components/home/home.component';
import { DateRenderComponent, ListaSolicitacoesComponent, SolicitacaoStatusRenderComponent, SolicitacaoTipoRenderComponent } from './components/lista-solicitacoes/lista-solicitacoes.component';
import { SelectComponent } from './components/select/select.component';
import { SolicitacaoCardComponent } from './components/solicitacao-card/solicitacao-card.component';
import { TratativaComponent } from './components/tratativa/tratativa.component';
import { HomeRoutingModule } from './home-routing.module';

const components = [
    HomeComponent,
    SolicitacaoCardComponent,
    ListaSolicitacoesComponent,
    SolicitacaoStatusRenderComponent,
    SolicitacaoTipoRenderComponent,
    DateRenderComponent,
    TratativaComponent,
    SelectComponent
]

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
        NbSelectModule,
        NbDatepickerModule,
    ],
    providers: [
        DatePipe,
    ],
    declarations: components,
    exports: components,
})
export class HomeModule { }
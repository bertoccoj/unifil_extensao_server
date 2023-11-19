import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { statusSolicitacaoText, tipoSolicitacaoText } from '../../../../application/core/const/text';
import { SolicitacaoListState } from '../../../../application/solicitacao/list/solicitacao-list.reducer';
import { selectSolicitacoesList, selectSolicitacoesListLoading } from '../../../../application/solicitacao/list/solicitacao-list.selectors';
import { SolicitacaoActions } from '../../../../application/solicitacao/solicitacao.actions';
import { EStatusSolicitacao, ETipoSolicitacao, Solicitacao } from '../../../../domain/solicitacoes/solicitacao';

@Component({
  template: `{{ renderValue }}`,
})
export class SolicitacaoStatusRenderComponent {
  @Input() value: any;

  get renderValue(): string {
    return statusSolicitacaoText[this.value];
  }
}

@Component({
  template: `{{ renderValue }}`,
})
export class SolicitacaoTipoRenderComponent {
  @Input() value: ETipoSolicitacao;

  get renderValue(): string {
    return tipoSolicitacaoText[this.value];
  }
}

@Component({
  template: `{{ renderValue | date:'dd/MM/yyyy HH:mm' }}`, // Customize the date format as needed
})
export class DateRenderComponent {
  @Input() value: any;

  get renderValue(): Date {
    return new Date(this.value);
  }
}

@Component({
  selector: 'ngx-lista-solicitacoes',
  templateUrl: './lista-solicitacoes.component.html',
  styleUrls: ['./lista-solicitacoes.component.scss']
})
export class ListaSolicitacoesComponent implements OnInit {

  isLoadingList$: Observable<boolean>;
  list$: Observable<Solicitacao[]>;

  tableSettings;
  tableDataSourde: LocalDataSource = new LocalDataSource();
  subList: Subscription;

  constructor(
    private listStore: Store<SolicitacaoListState>,
    private router: Router,
  ) { }

  ngOnDestroy() {
    this.subList?.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoadingList$ = this.listStore.select(selectSolicitacoesListLoading);
    this.list$ = this.listStore.select(selectSolicitacoesList);
    this.listStore.dispatch(SolicitacaoActions.loadSolicitacoes());

    this.tableSettings = {
      add: false,
      actions: {
        add: false,
        edit: false,
        delete: true,
      },
    }

    this.subList = this.list$.pipe(
      filter(Boolean),
    ).subscribe((lista: Solicitacao[]) => {
      this.tableSettings = {
        pager: {
          perPage: 10,
          display: true,
        },
        add: false,
        delete: {
          deleteButtonContent: '<div><i class="nb-edit"></i></div>',
          confirmDelete: true,
        },
        actions: {
          add: false,
          edit: false,
          delete: true,
        },
        columns: {
          id: {
            title: 'id',
            type: 'string',
            width: '5%',
            filter: true,
          },
          status: {
            title: 'Status',
            type: 'custom',
            renderComponent: SolicitacaoStatusRenderComponent,
            width: '20%',
            filter: {
              type: 'list',
              config: {
                selectText: '',
                list: [
                  EStatusSolicitacao.aguardandoAnalise,
                  EStatusSolicitacao.aguardandoReparo,
                  EStatusSolicitacao.concluido,
                  EStatusSolicitacao.reparoRecusado,
                ].map(
                  (k) => ({ value: k, title: statusSolicitacaoText[k] })
                )
              },
            },
          },
          tipo: {
            title: 'Tipo',
            type: 'custom',
            renderComponent: SolicitacaoTipoRenderComponent,
            width: '20%',
            filter: {
              type: 'list',
              config: {
                selectText: '',
                list: [
                  ETipoSolicitacao.buraco,
                  ETipoSolicitacao.esgoto,
                  ETipoSolicitacao.iluminacaoPublica,
                  ETipoSolicitacao.outros,
                ].map(
                  (k) => ({ value: k, title: tipoSolicitacaoText[k] })
                )
              },
            },
          },
          cidade: {
            title: 'cidade',
            valuePrepareFunction: (c, r) => r.cidade.nome,
            type: 'string',
            width: '2%',
            // filter: {
            //   type: 'list',
            //   config: {
            //     selectText: '',
            //     list: Array.from(
            //       new Set(lista.map(s => JSON.stringify(s.cidade)))
            //     ).map((c) => JSON.parse(c))
            //       .map((c) => ({ value: c.nome, title: c.nome }))
            //   },
            // }
          },
          estado: {
            title: 'estado',
            valuePrepareFunction: (c, r) => `${r.estado.nome}`,
            type: 'string',
            width: '2%',
          },
          createdAt: {
            title: 'Data de criação',
            type: 'custom',
            renderComponent: DateRenderComponent,
            width: '20%',
            filter: false,
          },
          updatedAt: {
            title: 'Data de atualização',
            type: 'custom',
            renderComponent: DateRenderComponent,
            width: '20%',
            filter: false,
          },
        },
      }
      this.tableDataSourde.load(lista)
    })

  }

  goToTratativaPage({ data }: { data: Solicitacao }) {
    this.router.navigate(['home', 'solicitacoes', data.id]);
  }

}

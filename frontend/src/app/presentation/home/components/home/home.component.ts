import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
    selector: 'ngx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    menu: NbMenuItem[] = [
        {
            title: 'Solicitações',
            icon: 'archive',
            link: '/home/solicitacoes'
        },
    ];


}

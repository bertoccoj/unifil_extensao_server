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
            children: [
                // {
                //   title: 'Queues',
                //   url: Environment.getApiUrl('admin', 'queues'),
                //   target: '_blank'
                // }
                //     {
                //       title: 'Settings',
                //       link: '/admin/library/settings',
                //     },
            ]
        },
    ];


}

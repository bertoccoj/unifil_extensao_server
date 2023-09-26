import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Users',
    icon: 'person',
    children: [
      {
        title: 'Requisisões de permissão',
        link: '/admin/role-request',
      },
      // {
      //   title: 'Lista de usuários',
      //   link: '/admin/users',
      // },
    ]
  },
];

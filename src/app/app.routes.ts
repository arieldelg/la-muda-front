import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./store-front/store-front.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

import { Routes } from '@angular/router';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReviewComponent } from '@/stores/page/review/review.component';

export const routes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: 'store',
        component: HomePageComponent,
      },
      {
        path: 'store/:id',
        component: ReviewComponent,
      },
      {
        path: '**',
        redirectTo: 'store',
      },
    ],
  },
];

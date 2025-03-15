import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
export interface RouterInt {
  title: string;
  path: string;
  icon: string;
}
@Component({
  selector: 'admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  public router = signal<RouterInt[]>([
    {
      path: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
    },
    {
      path: 'products',
      title: 'Productos',
      icon: 'shopping_bag',
    },
    {
      path: 'registerProduct',
      title: 'Registro Producto',
      icon: 'app_registration',
    },
    {
      path: '/',
      title: 'Tienda',
      icon: 'home',
    },
  ]);
}

import { Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { LayoutComponent } from '../component/layout/layout.component';
import { ProductsComponent } from '../component/products/products.component';
import { CartComponent } from '../component/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
];

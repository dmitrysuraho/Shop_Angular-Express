import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AuthGuard} from './guards/auth.guard';
import {OrderingGuard} from './guards/ordering.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./components/product-details/product-details.module').then(m => m.ProductDetailsModule)
  },
  {
    path: 'authorization',
    loadChildren: () => import('./components/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'basket',
    loadChildren: () => import('./components/basket/basket.module').then(m => m.BasketModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ordering',
    loadChildren: () => import('./components/ordering/ordering.module').then(m => m.OrderingModule),
    canActivate: [AuthGuard, OrderingGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./components/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./components/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

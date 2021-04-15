import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BasketComponent} from './basket.component';
import {BasketProductComponent} from './basket-product/basket-product.component';
import {PaginationModule} from '../pagination/pagination.module';

const routes: Routes = [
  {path: '', component: BasketComponent}
];

@NgModule({
  declarations: [BasketComponent, BasketProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PaginationModule
  ],
  bootstrap: [BasketComponent]
})
export class BasketModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop.component';
import {FiltersComponent} from './filters/filters.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from '../pagination/pagination.module';
import {ProductModule} from './product/product.module';

const routes: Routes = [
  {path: '', component: ShopComponent}
];

@NgModule({
  declarations: [ShopComponent, FiltersComponent, ProductsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PaginationModule,
    ProductModule
  ],
  bootstrap: [ShopComponent]
})
export class ShopModule {
}

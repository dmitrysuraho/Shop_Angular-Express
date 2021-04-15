import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {NewCollectionComponent} from './new-collection/new-collection.component';
import {CategoryComponent} from './category/category.component';
import {BrandsComponent} from './brands/brands.component';
import {PopularProductsComponent} from './popular-products/popular-products.component';
import {ProductModule} from '../shop/product/product.module';

const routes: Routes = [
  {path: '', component: MainComponent}
];

@NgModule({
  declarations: [MainComponent, NewCollectionComponent, CategoryComponent, BrandsComponent, PopularProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}

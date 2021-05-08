import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailsComponent} from './product-details.component';
import {NotificationModule} from "../notification/notification.module";

const routes: Routes = [
  {path: '', component: ProductDetailsComponent}
];

@NgModule({
  declarations: [ProductDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NotificationModule
    ],
  bootstrap: [ProductDetailsComponent]
})
export class ProductDetailsModule {
}

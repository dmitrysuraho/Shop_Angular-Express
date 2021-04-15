import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrderingComponent} from './ordering.component';
import {DeliveryAddressModule} from '../profile/delivery-address/delivery-address.module';
import {PaymentCardModule} from '../profile/payment-card/payment-card.module';

const routes: Routes = [
  {path: '', component: OrderingComponent}
];

@NgModule({
  declarations: [OrderingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DeliveryAddressModule,
    PaymentCardModule
  ],
  bootstrap: [OrderingComponent]
})
export class OrderingModule {
}

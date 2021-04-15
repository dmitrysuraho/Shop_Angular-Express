import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {PaymentCardComponent} from './payment-card/payment-card.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from '../pagination/pagination.module';
import {DeliveryAddressComponent} from './delivery-address/delivery-address.component';
import {HistoryOrderComponent} from './purchase-history/history-order/history-order.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children:
      [
        {path: 'personal', component: PersonalDataComponent},
        {path: 'address', component: DeliveryAddressComponent},
        {path: 'card', component: PaymentCardComponent},
        {path: 'history', component: PurchaseHistoryComponent}
      ]
  }
];

@NgModule({
  declarations: [ProfileComponent, PersonalDataComponent, PurchaseHistoryComponent, HistoryOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PaginationModule
  ],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {
}

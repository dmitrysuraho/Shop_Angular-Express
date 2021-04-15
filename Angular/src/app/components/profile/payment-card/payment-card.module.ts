import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentCardComponent} from './payment-card.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  exports: [PaymentCardComponent],
  declarations: [PaymentCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [PaymentCardComponent]
})
export class PaymentCardModule {
}

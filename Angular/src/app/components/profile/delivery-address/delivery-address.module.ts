import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryAddressComponent} from './delivery-address.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  exports: [DeliveryAddressComponent],
  declarations: [DeliveryAddressComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [DeliveryAddressComponent]
})
export class DeliveryAddressModule {
}

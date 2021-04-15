import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../models/user';
import {PaymentCard} from '../models/payment-card';
import {DeliveryAddress} from '../models/delivery-address';
import {HttpClient} from "@angular/common/http";
import {Routing} from "../import-data/routing.enum";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  public readonly Routing: typeof Routing = Routing;

  public constructor(
    private http: HttpClient) {
  }

  public getUserPersonalData(): Observable<User> {
    return this.http.get<User>(`${Routing.DOMAIN}/api/users/personal`);
  }

  public getUserDeliveryAddress(): Observable<DeliveryAddress> {
    return this.http.get<DeliveryAddress>(`${Routing.DOMAIN}/api/users/address`);
  }

  public getUserPaymentCard(): Observable<PaymentCard> {
    return this.http.get<PaymentCard>(`${Routing.DOMAIN}/api/users/card`);
  }

  public savePersonalData(form: FormGroup): Observable<{result: number}> {
    return this.http.put<{result: number}>(`${Routing.DOMAIN}/api/users/personal`, {
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      phone: form.controls['phone'].value
    });
  }

  public saveDeliveryAddress(form: FormGroup): Observable<{result: number}> {
    return this.http.put<{result: number}>(`${Routing.DOMAIN}/api/users/address`, {
      country: form.controls['country'].value,
      city: form.controls['city'].value,
      zip: Number(form.controls['zip'].value),
      address: form.controls['address'].value
    });
  }

  public savePaymentCard(form: FormGroup): Observable<{result: number}> {
    return this.http.put<{result: number}>(`${Routing.DOMAIN}/api/users/card`, {
      cardNumber: Number(form.controls['cardNumber'].value),
      cardMonth: Number(form.controls['cardMonth'].value),
      cardYear: Number(form.controls['cardYear'].value),
      cardCCV: Number(form.controls['cardCCV'].value),
      cardName: form.controls['cardName'].value
    });
  }
}

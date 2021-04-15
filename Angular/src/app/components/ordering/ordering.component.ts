import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableInput, of, Subscription} from 'rxjs';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product';
import {DeliveryAddress} from '../../models/delivery-address';
import {PaymentCard} from '../../models/payment-card';
import {UserService} from '../../services/user.service';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {BasketService} from '../../services/basket.service';
import {catchError, tap} from 'rxjs/operators';
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../models/order";

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.less']
})
export class OrderingComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public basketProducts: Product[];
  public totalPrice: number = 0;

  public deliveryAddress: DeliveryAddress;
  public paymentCard: PaymentCard;

  public isChangeAddress: boolean;
  public isChangeCard: boolean;

  public isAddress: boolean;
  public isCard: boolean;

  public constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private productsService: ProductsService,
    private userService: UserService,
    private sharedService: SharedService,
    private basketService: BasketService,
    private ordersService: OrdersService) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.userService.getUserDeliveryAddress()
      .subscribe((address: DeliveryAddress) => {
      if ((this.deliveryAddress = address).country) {
        this.isAddress = true;
      }
    }));
    this.subscription.add(this.userService.getUserPaymentCard()
      .subscribe((card: PaymentCard) => {
      if ((this.paymentCard = card).cardNumber) {
        this.isCard = true;
      }
    }));
    this.subscription.add(this.basketService.getBasketProducts()
      .subscribe((items: Product[]) => {
        this.basketProducts = items;
      }));
    this.subscription.add(this.basketService.getBasketProductsSumPrice()
      .subscribe((basketProductsSumPrice: {sum: number}) => {
        this.totalPrice = basketProductsSumPrice.sum;
      }));
  }

  public openChangeAddress(): void {
    this.isChangeAddress = true;
    this.sharedService.popup$.next(true);
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public closeChangeAddress(): void {
    this.isChangeAddress = false;
    this.sharedService.popup$.next(false);
  }

  public saveAddressChanges(): void {
    this.sharedService.popup$.next(false);
    this.isChangeAddress = false;
    this.subscription.add(this.userService.getUserDeliveryAddress()
      .subscribe((address: DeliveryAddress) => {
        this.deliveryAddress = address;
        this.isAddress = true;
      }));
  }

  public openChangeCard(): void {
    this.isChangeCard = true;
    this.sharedService.popup$.next(true);
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public closeChangeCard(): void {
    this.isChangeCard = false;
    this.sharedService.popup$.next(false);
  }

  public saveCardChanges(): void {
    this.sharedService.popup$.next(false);
    this.isChangeCard = false;
    this.subscription.add(this.userService.getUserPaymentCard()
      .subscribe((card: PaymentCard) => {
        this.paymentCard = card;
        this.isCard = true;
      }));
  }

  public buy(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.subscription.add(this.ordersService.makeOrder()
      .pipe(
        tap((order: Order) => {
          this.router.navigate(['/checkout'])
          localStorage.setItem('lastOrder', order.id.toString());
          this.sharedService.basketProductsLength$.next(0);
        }),
        catchError((): ObservableInput<Product[]> => {
          this.router.navigate(['/ordering']);
          return of();
        })
    ).subscribe());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

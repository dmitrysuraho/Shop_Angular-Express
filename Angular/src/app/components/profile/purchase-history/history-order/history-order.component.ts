import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../../../models/order';
import {Observable, Subscription} from 'rxjs';
import {ProductsService} from '../../../../services/products.service';
import {Product} from '../../../../models/product';
import {OrdersService} from '../../../../services/orders.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.less']
})
export class HistoryOrderComponent implements OnInit, OnDestroy {

  @Input()
  public order: Order;

  private subscription: Subscription = new Subscription();

  public products$: Observable<Product[]>;
  public totalPrice: number;

  public constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService) {
  }

  public ngOnInit(): void {
    this.products$ = this.ordersService.getBoughtProductsFromOrder(this.order.id);
    this.subscription.add(this.ordersService.getSumPriceFromOrder(this.order.id)
      .subscribe((orderSumPrice: {sum: number}) => {
        this.totalPrice = orderSumPrice.sum;
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

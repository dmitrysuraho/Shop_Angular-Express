import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ProductsService} from '../../../services/products.service';
import {UserService} from '../../../services/user.service';
import {Order} from '../../../models/order';
import {SharedService} from '../../../services/shared.service';
import {OrdersService} from '../../../services/orders.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.less']
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public onePageHistoryOrders$: Observable<Order[]>;
  public historyOrdersLength: number;
  public totalPrice: number = 0;
  public currentPage: number;

  public constructor(
    private userService: UserService,
    private productsService: ProductsService,
    private sharedService: SharedService,
    private ordersService: OrdersService) {
  }

  public ngOnInit(): void {
    this.sharedService.profileTitle$.next('Purchase history');
    this.currentPage = 1;
    this.subscription.add(this.ordersService.getOrdersCount()
      .subscribe((ordersCount: {count: number}) => {
      this.historyOrdersLength = ordersCount.count;
    }));
    this.onePageHistoryOrders$ = this.ordersService.getOrdersForOnePage(this.currentPage);
  }

  public onChangePage(currentPage: number): void {
    this.currentPage = currentPage;
    this.onePageHistoryOrders$ = this.ordersService.getOrdersForOnePage(this.currentPage);
  }

  public clearHistory(): void {
    this.subscription.add(this.ordersService.deleteOrders()
      .subscribe(() => {
        this.historyOrdersLength = 0;
        this.onePageHistoryOrders$ = null;
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

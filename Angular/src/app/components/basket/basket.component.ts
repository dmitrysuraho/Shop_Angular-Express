import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductsService} from '../../services/products.service';
import {Observable, ObservableInput, of, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ViewportScroller} from '@angular/common';
import {SharedService} from '../../services/shared.service';
import {BasketService} from '../../services/basket.service';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less']
})
export class BasketComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public onePageBasketProducts$: Observable<Product[]>;
  public basketProductsLength: number = 0;
  public totalPrice: number = 0;
  public currentPage: number;

  public constructor(
    private viewportScroller: ViewportScroller,
    private userService: UserService,
    private productsService: ProductsService,
    private router: Router,
    private sharedService: SharedService,
    private basketService: BasketService) {
  }

  public ngOnInit(): void {
    this.sharedService.popup$.next(false);
    this.currentPage = 1;
    this.onePageBasketProducts$ = this.basketService.getBasketProductsForPage(this.currentPage)
      .pipe(
        catchError((): ObservableInput<Product[]> => {
          this.totalPrice = 0;
          return of();
        })
      );
    this.subscription.add(this.basketService.getBasketProductsSumPrice()
      .subscribe((basketProductsSumPrice: {sum: number}) => {
        this.totalPrice = basketProductsSumPrice?basketProductsSumPrice.sum:0;
      }));
    this.subscription.add(this.basketService.getBasketProductsCount()
      .subscribe((basketProductsCount: {count: number}) => {
        this.basketProductsLength = basketProductsCount.count;
      }));
  }

  public refreshProductsInCart(price: number): void {
    this.currentPage = 1;
    this.onePageBasketProducts$ = this.basketService.getBasketProductsForPage(this.currentPage)
      .pipe(
        catchError((): ObservableInput<Product[]> => {
          this.totalPrice = 0;
          return of();
        })
      );
    this.totalPrice -= price;
    this.basketProductsLength--;
    this.sharedService.basketProductsLength$.next(this.basketProductsLength);
  }

  public onChangePage(currentPage: number): void {
    this.currentPage = currentPage;
    this.onePageBasketProducts$ = this.basketService.getBasketProductsForPage(this.currentPage)
      .pipe(
        catchError((): ObservableInput<Product[]> => {
          this.totalPrice = 0;
          return of();
        })
      );
  }

  public placeOrder(): void {
    this.router.navigate(['/ordering']);
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

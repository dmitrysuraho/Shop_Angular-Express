import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {ViewportScroller} from '@angular/common';
import {SharedService} from '../../services/shared.service';
import {BasketService} from '../../services/basket.service';
import {Routing} from '../../import-data/routing.enum';
import {switchMap, tap} from 'rxjs/operators';
import {WebsocketService} from "../../services/websocket/websocket.service";
import {WS} from "../../services/websocket/websocket.events";

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public readonly Routing: typeof Routing = Routing;

  private subscription: Subscription = new Subscription();

  public product: Product;
  public urlPicture: string;

  public button: string;

  public isAddProduct: boolean;

  constructor(
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private sharedService: SharedService,
    private basketService: BasketService,
    private wsService: WebsocketService) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.activateRoute.queryParams
      .pipe(
        switchMap((params: Params) => {
          return this.productsService.getProductById(Number(params['product']))
            .pipe(
              tap((item: Product) => {
                this.product = item;
                this.urlPicture = `${this.Routing.DOMAIN}/static/${this.product?.picture}`;
              })
            )
        }),
        switchMap((item: Product) => {
          if (localStorage.getItem('token')) {
            return this.basketService.isAddToBasket(item.id)
              .pipe(
                tap((isAdd: {add: boolean}) => {
                  if (isAdd.add) {
                    this.button = 'ADDED';
                  } else {
                    this.button = 'ADD TO CART';
                  }
                })
              )
          } else {
            this.button = 'ADD TO CART';
            return of();
          }
        })
      )
      .subscribe(() => {}, () => {
        this.router.navigate(['/main']);
      }));

    this.wsService.on<IMessage[]>(WS.ON.MESSAGES)
      .subscribe(message => {
        this.isAddProduct = !!message;
      });
  }

  public addToCart(): void {
    if (localStorage.getItem('token')) {
      if (this.button == 'ADD TO CART') {
        this.subscription.add(this.basketService.addToBasket(this.product.id)
          .pipe(
            switchMap(() => {
              this.button = 'ADDED';
              this.wsService.send(WS.SEND.ADD_PRODUCT, 'add product');
              this.viewportScroller.scrollToPosition([0, 0]);
              return this.basketService.getBasketProductsCount()
                .pipe(
                  tap((basketProductCount: {count: number}) =>
                    this.sharedService.basketProductsLength$.next(basketProductCount.count)
                  )
                )
            })
          ).subscribe());
      }
    } else {
      localStorage.setItem('path', `${location.pathname}${location.search}`);
      this.router.navigate(['/authorization']);
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  public closeNotification(): void {
    this.isAddProduct = false;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

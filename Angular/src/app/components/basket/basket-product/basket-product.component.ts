import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../models/product';
import {ViewportScroller} from '@angular/common';
import {ProductsService} from '../../../services/products.service';
import {BasketService} from '../../../services/basket.service';
import {Routing} from '../../../import-data/routing.enum';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.less']
})
export class BasketProductComponent implements OnInit {

  @Input()
  public product: Product;

  @Output()
  public onDeleteFromCart: EventEmitter<number> = new EventEmitter();

  public readonly Routing: typeof Routing = Routing;

  public urlPicture: string;

  public constructor(
    private viewportScroller: ViewportScroller,
    private productService: ProductsService,
    private basketService: BasketService) {
  }

  public ngOnInit(): void {
    this.urlPicture = `${this.Routing.DOMAIN}/static/${this.product?.picture}`;
  }

  public toUpPage(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public deleteProductFromCart(): void {
    this.basketService.deleteProductFromBasket(this.product.id)
      .subscribe(() => {
        this.onDeleteFromCart.emit(this.product.price);
      });
  }
}

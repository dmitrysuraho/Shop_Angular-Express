import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {ViewportScroller} from '@angular/common';
import {Routing} from '../../../import-data/routing.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  @Input()
  public product: Product;

  public readonly Routing: typeof Routing = Routing;

  public urlPicture: string;

  public constructor(private viewportScroller: ViewportScroller) {
  }

  public ngOnInit(): void {
    this.urlPicture = `${this.Routing.DOMAIN}/static/${this.product?.picture}`;
  }

  public toUpPage(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {ProductsService} from '../../services/products.service';
import {ViewportScroller} from '@angular/common';
import {OrdersService} from '../../services/orders.service';
import {Routing} from '../../import-data/routing.enum';
import {SharedService} from '../../services/shared.service';
import {Product} from '../../models/product';
import {Subscription} from 'rxjs';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  public readonly Routing: typeof Routing = Routing;

  private subscription: Subscription = new Subscription();

  public check: string = '';
  public totalPrice: number = 0;

  public constructor(
    private productsService: ProductsService,
    private viewportScroller: ViewportScroller,
    private ordersService: OrdersService,
    private sharedService: SharedService) {
  }

  public ngOnInit(): void {
    this.check += 'CHECK\n\n';
    this.subscription.add(this.ordersService.getBoughtProductsFromOrder(Number(localStorage.getItem('lastOrder')))
      .subscribe((items: Product[]) => {
        items.map((item: Product) => {
          this.check += `${item.name} - $${item.price}\n`;
          this.totalPrice += item.price;
        });
        this.check += `\nTotal price: $${this.totalPrice}`;
      }));
  }

  public toUpPage(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public generatePdf(): void {
    const documentDefinition = {content: this.check};
    pdfMake.createPdf(documentDefinition).download();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

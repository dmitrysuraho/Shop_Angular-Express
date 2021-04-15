import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less']
})
export class ShopComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public typeForBg: string;

  public constructor(
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.activateRoute.queryParams
      .subscribe((params: Params) => {
      if (params['type'] == undefined) {
        this.typeForBg = 'All products';
      } else {
        this.typeForBg = params['type'][0].toUpperCase() + params['type'].slice(1);
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

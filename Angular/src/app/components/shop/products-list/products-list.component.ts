import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Product} from '../../../models/product';
import {Observable, of, Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public isSortPriceAsc: boolean = false;
  public isSortPriceDesc: boolean = false;

  public onePageProducts$: Observable<Product[]>;
  public productLength: number;
  public currentPage: number;

  public constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.activatedRoute.queryParams
      .pipe(
        map((params: Params) => {
          if (params['sortPrice'] === 'asc') {
            this.isSortPriceAsc = true;
            this.isSortPriceDesc = false;
          } else if (params['sortPrice'] === 'desc') {
            this.isSortPriceAsc = false;
            this.isSortPriceDesc = true;
          } else {
            this.isSortPriceAsc = false;
            this.isSortPriceDesc = false;
          }
          this.currentPage = 1;
          return params;
        }),
        switchMap((params: Params) => {
          this.onePageProducts$ = this.productsService.getProductsForPage(params, this.currentPage);
          this.onePageProducts$.subscribe(() => {}, () => {
            this.onePageProducts$ = of([]);
            this.productLength = 0;
          });
          return this.productsService.getProductsCount(params)
            .pipe(
              tap((productCount: {count: number}) => {
                this.productLength = productCount.count;
              })
            );
        })
      ).subscribe());
  }

  public onChangePage(currentPage: number) {
    this.currentPage = currentPage;
    this.subscription.add(this.activatedRoute.queryParams
      .pipe(
        switchMap((params: Params) =>
          this.onePageProducts$ = this.productsService.getProductsForPage(params, this.currentPage))
      ).subscribe());
  }

  public sortPriceAsc(): void {
    this.isSortPriceAsc = !this.isSortPriceAsc;
    this.isSortPriceDesc = false;
    if (this.isSortPriceAsc) {
      this.productsService.addFilter({sortPrice: 'asc'});
    } else {
      this.productsService.addFilter({sortPrice: null});
    }
  }

  public sortPriceDesc(): void {
    this.isSortPriceDesc = !this.isSortPriceDesc;
    this.isSortPriceAsc = false;
    if (this.isSortPriceDesc) {
      this.productsService.addFilter({sortPrice: 'desc'});
    } else {
      this.productsService.addFilter({sortPrice: null});
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from '../../../models/menu';
import {ViewportScroller} from '@angular/common';
import {ProductsService} from '../../../services/products.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {Routing} from '../../../import-data/routing.enum';
import {MenuService} from '../../../services/menu.service';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit, OnDestroy {

  public clothing$: Observable<Menu[]>;
  public shoes$: Observable<Menu[]>;
  public accessories$: Observable<Menu[]>;
  public brands$: Observable<Menu[]>;

  public readonly Routing: typeof Routing = Routing;

  private subscription: Subscription = new Subscription();

  public isOpenClothingMenu: boolean = false;
  public isOpenShoesMenu: boolean = false;
  public isOpenAccessoriesMenu: boolean = false;

  public minPrice: number;
  public maxPrice: number;
  public fromPrice: number;
  public toPrice: number;

  public constructor(
    private productService: ProductsService,
    private viewportScroller: ViewportScroller,
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscription.add(this.activatedRoute.queryParams
      .pipe(
        switchMap((params: Params) => {
          return forkJoin([this.productService.getMinPriceProduct(), this.productService.getMaxPriceProduct()])
            .pipe(
              tap(([minPrice, maxPrice]: [{min: number}, {max: number}]) => {
                this.minPrice = minPrice.min;
                this.maxPrice = maxPrice.max;
                if (!params['filterPrice']) {
                  this.fromPrice = minPrice.min;
                  this.toPrice = maxPrice.max;
                } else {
                  const filterPriceArray = params['filterPrice'].split('-');
                  this.fromPrice = Number(filterPriceArray[0]) <= Number(filterPriceArray[1]) && Number(filterPriceArray[0]) >= minPrice.min ? Number(filterPriceArray[0]) : minPrice.min;
                  this.toPrice = Number(filterPriceArray[1]) >= Number(filterPriceArray[0]) && Number(filterPriceArray[1]) <= maxPrice.max ? Number(filterPriceArray[1]) : maxPrice.max;
                  this.productService.addFilter({filterPrice: `${this.fromPrice}-${this.toPrice}`});
                }
              })
            );
        })
      ).subscribe());
    this.clothing$ = this.menuService.getClothing().pipe(
      tap((categories: Menu[]) => categories.unshift({type: 'clothing', category: 'All', brand: ''})));
    this.shoes$ = this.menuService.getShoes().pipe(
      tap((categories: Menu[]) => categories.unshift({type: 'shoes', category: 'All', brand: ''})));
    this.accessories$ = this.menuService.getAccessories().pipe(
      tap((categories: Menu[]) => categories.unshift({type: 'accessories', category: 'All', brand: ''})));
    this.brands$ = this.menuService.getBrands();
  }

  public addBrandQueryParam(category: string): void {
    this.productService.addFilter({brand: category});
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public onChangeFromPrice(): void {
    this.fromPrice = this.fromPrice <= this.toPrice ? this.fromPrice : this.toPrice;
    this.productService.addFilter({filterPrice: `${this.fromPrice}-${this.toPrice}`});
  }

  public onChangeToPrice(): void {
    this.toPrice = this.toPrice >= this.fromPrice ? this.toPrice : this.fromPrice;
    this.productService.addFilter({filterPrice: `${this.fromPrice}-${this.toPrice}`});
  }

  public resetFilters(): void {
    this.fromPrice = this.minPrice;
    this.toPrice = this.maxPrice;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

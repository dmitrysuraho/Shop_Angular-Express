import {Injectable, OnDestroy} from '@angular/core';
import {Product} from '../models/product';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SharedService} from './shared.service';
import {BasketService} from './basket.service';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Routing} from "../import-data/routing.enum";

@Injectable()
export class ProductsService implements OnDestroy {

  public readonly Routing: typeof Routing = Routing;

  private subscription: Subscription = new Subscription();

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private basketService: BasketService,
    private http: HttpClient) {
  }

  public getPopularProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.Routing.DOMAIN}/api/products/popular`);
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.Routing.DOMAIN}/api/products/product/${id}`);
  }

  public getProductsForPage(arrayParams: Params, currentPage: number): Observable<Product[]> {
    let params: HttpParams = new HttpParams().set('currentPage', currentPage.toString());
    for (const param in arrayParams) {
      params = params.set(param, arrayParams[param]);
    }
    return this.http.get<Product[]>(`${this.Routing.DOMAIN}/api/products`, {params});
  }

  public getProductsCount(arrayParams: Params): Observable<{ count: number }> {
    let params: HttpParams = new HttpParams();
    for (const param in arrayParams) {
      params = params.set(param, arrayParams[param]);
    }
    return this.http.get<{ count: number }>(`${this.Routing.DOMAIN}/api/products/count`, {params});
  }

  public addFilter(arrayParams: any): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: arrayParams,
      queryParamsHandling: 'merge'
    });
  }

  public getMinPriceProduct(): Observable<{ min: number }> {
    return this.http.get<{ min: number }>(`${this.Routing.DOMAIN}/api/products/min`);
  }

  public getMaxPriceProduct(): Observable<{ max: number }> {
    return this.http.get<{ max: number }>(`${this.Routing.DOMAIN}/api/products/max`);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

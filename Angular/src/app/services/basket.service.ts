import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../models/product';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Routing} from '../import-data/routing.enum';

@Injectable()
export class BasketService {

  public readonly Routing: typeof Routing = Routing;

  public constructor(
    private http: HttpClient) {
  }

  public getBasketProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${Routing.DOMAIN}/api/baskets/products`);
  }

  public getBasketProductsForPage(currentPage: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${Routing.DOMAIN}/api/baskets/products/page?currentPage=${currentPage}`);
  }

  public getBasketProductsCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`${Routing.DOMAIN}/api/baskets/count`);
  }

  public getBasketProductsSumPrice(): Observable<{sum: number}> {
    return this.http.get<{sum: number}>(`${Routing.DOMAIN}/api/baskets/sum`);
  }

  public addToBasket(pid: number): Observable<any> {
    return this.http.post(`${Routing.DOMAIN}/api/baskets`, {
      productId: pid
    });
  }

  public isAddToBasket(pid: number): Observable<{add: boolean}>{
    return this.http.get<{add: boolean}>(`${Routing.DOMAIN}/api/baskets/is/${pid}`);
  }

  public deleteProductFromBasket(pid: number): Observable<number> {
    return this.http.delete<number>(`${Routing.DOMAIN}/api/baskets/${pid}`);
  }

  public isBasket(): Observable<boolean> {
    return this.getBasketProductsCount()
      .pipe(
        switchMap((count: {count: number}) => {
          if (count.count > 0) return of(true);
          else return of(false);
        })
      );
  }
}

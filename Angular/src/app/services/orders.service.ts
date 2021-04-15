import {Injectable} from '@angular/core';
import {Order} from '../models/order';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {HttpClient} from "@angular/common/http";
import {Routing} from "../import-data/routing.enum";

@Injectable()
export class OrdersService {

  public readonly Routing: typeof Routing = Routing;

  public constructor(private http: HttpClient) { }

  public makeOrder(): Observable<Order> {
    return this.http.post<Order>(`${Routing.DOMAIN}/api/orders`, null);
  }

  public getOrdersCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`${Routing.DOMAIN}/api/orders/count`);
  }

  public getOrdersForOnePage(currentPage: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${Routing.DOMAIN}/api/orders?currentPage=${currentPage}`);
  }

  public getBoughtProductsFromOrder(order: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${Routing.DOMAIN}/api/orders/${order}/products`);
  }

  public getSumPriceFromOrder(order: number): Observable<{sum: number}> {
    return this.http.get<{sum: number}>(`${Routing.DOMAIN}/api/orders/${order}/sum`);
  }

  public deleteOrders(): Observable<void> {
    return this.http.delete<void>(`${Routing.DOMAIN}/api/orders/`);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Menu} from '../models/menu';
import {HttpClient} from "@angular/common/http";
import {Routing} from "../import-data/routing.enum";
import {tap} from "rxjs/operators";

@Injectable()
export class MenuService {

  public readonly Routing: typeof Routing = Routing;

  public constructor(
    private http: HttpClient) {
  }

  public getClothing(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.Routing.DOMAIN}/api/categories/clothing`)
      .pipe(
        tap((clothing: Menu[]) => clothing.map((clth: Menu) => clth.category = clth.category[0].toUpperCase() + clth.category.slice(1)))
      );
  }

  public getShoes(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.Routing.DOMAIN}/api/categories/shoes`)
      .pipe(
        tap((shoes: Menu[]) => shoes.map((sh: Menu) => sh.category = sh.category[0].toUpperCase() + sh.category.slice(1)))
      );
  }

  public getAccessories(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.Routing.DOMAIN}/api/categories/accessories`)
      .pipe(
        tap((accessories: Menu[]) => accessories.map((acc: Menu) => acc.category = acc.category[0].toUpperCase() + acc.category.slice(1)))
      );
  }

  public getBrands(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.Routing.DOMAIN}/api/brands`)
      .pipe(
        tap((brands: Menu[]) => brands.map((br: Menu) => br.brand = br.brand[0].toUpperCase() + br.brand.slice(1)))
      );
  }
}

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {BasketService} from '../services/basket.service';
import {Observable} from "rxjs";

@Injectable()
export class OrderingGuard implements CanActivate {

  public constructor(
    private router: Router,
    private basketService: BasketService) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    this.basketService.isBasket()
      .subscribe((flag: boolean) => {
        if(!flag) this.router.navigate(['/basket']);
      });
    return this.basketService.isBasket();
  }
}

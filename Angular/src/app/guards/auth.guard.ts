import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Routing} from "../import-data/routing.enum";

@Injectable()
export class AuthGuard implements CanActivate {

  public readonly Routing: typeof Routing = Routing;

  public constructor(private router: Router) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      localStorage.setItem('path', `${state.url}`);
      this.router.navigate(['/authorization']);
      return false;
    }
  }
}

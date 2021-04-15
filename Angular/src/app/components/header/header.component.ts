import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Menu} from '../../models/menu';
import {ViewportScroller} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SharedService} from '../../services/shared.service';
import {BasketService} from '../../services/basket.service';
import {Routing} from '../../import-data/routing.enum';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public clothing$: Observable<Menu[]>;
  public shoes$: Observable<Menu[]>;
  public accessories$: Observable<Menu[]>;

  public readonly Routing: typeof Routing = Routing;

  private subscription: Subscription = new Subscription();

  public searchForm: FormGroup;

  public isNavMenu: boolean;
  public isShadow: boolean;
  public isSubNavMenu: boolean;
  public basketProductsLength: number;

  public isPopup: boolean;

  public constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private productService: ProductsService,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private basketService: BasketService,
    private menuService: MenuService) {
  }

  public ngOnInit(): void {
    this.clothing$ = this.menuService.getClothing();
    this.shoes$ = this.menuService.getShoes();
    this.accessories$ = this.menuService.getAccessories();
    this.searchForm = this.formBuilder.group({
      'search': ['']
    });
    this.isShadow = false;
    this.subscription.add(this.sharedService.basketProductsLength$
      .subscribe((length: number) => this.basketProductsLength = length));
    if (localStorage.getItem('token')) {
      this.subscription.add(this.basketService.getBasketProductsCount()
        .subscribe((basketProductsCount: {count: number}) => {
          this.sharedService.basketProductsLength$.next(basketProductsCount.count);
        }));
    } else {
      this.sharedService.basketProductsLength$.next(0);
    }
    this.sharedService.popup$
      .subscribe((popup: boolean) => this.isPopup = popup);
  }

  public toUpPage(): void {
    this.closeMenu();
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public showMenu(): void {
    this.isNavMenu = true;
  }

  public closeMenu(): void {
    this.isNavMenu = false;
    this.isSubNavMenu = false;
  }

  public search(search: string): void {
    if (search) {
      this.router.navigate(['/shop'], {
        queryParams: {search: search},
        queryParamsHandling: 'merge'
      });
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll($event: Event): void {
    // @ts-ignore
    this.isShadow = $event.path[1].scrollY > 0;
  }

  public isMenu(): void {
    this.isSubNavMenu = !this.isSubNavMenu;
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

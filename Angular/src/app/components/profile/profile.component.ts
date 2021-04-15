import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {SharedService} from '../../services/shared.service';
import {AuthService} from '../../services/auth.service';
import {Routing} from '../../import-data/routing.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  public readonly Routing: typeof Routing = Routing;

  public title: string;

  public constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private sharedService: SharedService) {
  }

  public ngOnInit(): void {
    this.sharedService.profileTitle$
      .subscribe((title: string) => this.title = title);
  }

  public logOut(): void {
    this.authService.logOut();
    this.sharedService.basketProductsLength$.next(0);
  }
}

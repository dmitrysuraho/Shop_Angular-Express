import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../models/product';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.less']
})
export class PopularProductsComponent implements OnInit {

  public popularProducts$: Observable<Product[]>;

  public constructor(private productsService: ProductsService) {
  }

  public ngOnInit(): void {
    this.popularProducts$ = this.productsService.getPopularProducts();
  }
}

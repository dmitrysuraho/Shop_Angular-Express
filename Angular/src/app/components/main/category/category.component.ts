import {Component} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {Routing} from '../../../import-data/routing.enum';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent {

  public readonly Routing: typeof Routing = Routing;

  public constructor(private viewportScroller: ViewportScroller) {
  }

  public toUpPage(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

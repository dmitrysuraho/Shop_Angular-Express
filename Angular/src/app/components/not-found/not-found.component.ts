import {Component} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {Routing} from '../../import-data/routing.enum';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent {

  public readonly Routing: typeof Routing = Routing;

  public constructor(private viewportScroller: ViewportScroller) {
  }

  public toUpPage(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

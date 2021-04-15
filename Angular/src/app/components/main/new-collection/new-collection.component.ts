import {Component} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {Routing} from '../../../import-data/routing.enum';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.less']
})
export class NewCollectionComponent {

  public readonly Routing: typeof Routing = Routing;

  public constructor(private viewportScroller: ViewportScroller) {
  }

  public toUpPage(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

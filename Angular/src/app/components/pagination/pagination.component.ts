import {Component, Input, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent {

  @Input()
  public currentPage: number;

  @Input()
  public productLength: number;

  @Input()
  public countProductsOnPage: number;

  @Output()
  public onChangePage: EventEmitter<number> = new EventEmitter();

  public constructor(private viewportScroller: ViewportScroller) {
  }

  public backPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onChangePage.emit(this.currentPage);
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  public forwardPage(): void {
    if (this.currentPage < Math.ceil(this.productLength / this.countProductsOnPage)) {
      this.currentPage++;
      this.onChangePage.emit(this.currentPage);
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }
}

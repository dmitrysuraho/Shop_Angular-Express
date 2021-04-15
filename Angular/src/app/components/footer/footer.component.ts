import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {SharedService} from '../../services/shared.service';
import {Routing} from '../../import-data/routing.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  public readonly Routing: typeof Routing = Routing;

  public isPopup: boolean;

  public constructor(
    private viewportScroller: ViewportScroller,
    private sharedService: SharedService) {
  }

  public ngOnInit(): void {
    this.sharedService.popup$
      .subscribe((popup: boolean) => this.isPopup = popup);
  }

  public toUpPage(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

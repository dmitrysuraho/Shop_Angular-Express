import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent {

  @Input()
  public titleNotification: string;

  @Output()
  public onCloseNotification: EventEmitter<void> = new EventEmitter();

  public closeNotification(): void {
    this.onCloseNotification.emit();
  }

}

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SharedService {

  public basketProductsLength$: Subject<number> = new Subject();
  public profileTitle$: Subject<string> = new Subject();
  public popup$: Subject<boolean> = new Subject();
  public isCheckout$: Subject<boolean> = new Subject();
}

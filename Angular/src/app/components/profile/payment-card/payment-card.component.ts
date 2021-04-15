import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cardNumberValidator, cardYearValidator} from '../../../validators/card-validator';
import {ValidationErrorsService} from '../../../services/validation-errors.service';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';
import {PaymentCard} from '../../../models/payment-card';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.less']
})
export class PaymentCardComponent implements OnInit, OnDestroy {

  @Output()
  public saveCardChanges: EventEmitter<void> = new EventEmitter();

  private subscription: Subscription = new Subscription();

  public cardForm: FormGroup;
  public errorFields: Map<string, string> = new Map([
    ['cardNumber', ''],
    ['cardMonth', ''],
    ['cardYear', ''],
    ['cardCCV', ''],
    ['cardName', '']
  ]);

  public paymentCard: PaymentCard;
  public isSaved: boolean;
  public isChangeInput: boolean;

  public constructor(
    private formBuilder: FormBuilder,
    private validationErrors: ValidationErrorsService,
    private userService: UserService,
    private sharedService: SharedService) {
  }

  public ngOnInit(): void {
    this.sharedService.profileTitle$.next('Payment card');
    this.isChangeInput = false;
    this.cardForm = this.formBuilder.group({
      'cardNumber': ['', [Validators.required, Validators.minLength(16), Validators.pattern('^[0-9]+$'), cardNumberValidator]],
      'cardMonth': ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0][1-9]|[1][0-2]$')]],
      'cardYear': ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[2-9][0-9]$'), cardYearValidator]],
      'cardCCV': ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9][0-9][0-9]$')]],
      'cardName': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z]+ [A-Za-z]+$')]],
    });
    for (const key of this.errorFields.keys()) {
      this.subscription.add(this.cardForm.controls[key].statusChanges
        .subscribe((status: string) => {
          if (status === 'INVALID') {
            this.errorFields.set(key, this.validationErrors.errorValidationCard(this.cardForm.controls[key], key));
          }
        }));
    }
    this.subscription.add(this.userService.getUserPaymentCard()
      .subscribe((card: PaymentCard) => {
        this.paymentCard = card;
        for (const key in this.cardForm.controls) {
          this.cardForm.controls[key].setValue(this.paymentCard[key]?this.paymentCard[key]:'');
        }
      }, (err) => {
        console.log(err);
      }));
  }

  public changeInput(name: string): void {
    this.isChangeInput = this.cardForm.controls[name].value != this.paymentCard[name];
  }

  public saveCard(): void {
    if (this.isChangeInput) {
      this.subscription.add(this.userService.savePaymentCard(this.cardForm)
        .subscribe(() => {
          this.isSaved = true;
          setTimeout(() => this.isSaved = false, 2000);
          this.isChangeInput = false;
          this.userService.getUserPaymentCard()
            .subscribe((card: PaymentCard) => {
              this.paymentCard = card;
            });
          this.saveCardChanges.emit();
        }));
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

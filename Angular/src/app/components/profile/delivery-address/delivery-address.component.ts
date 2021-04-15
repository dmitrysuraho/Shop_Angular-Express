import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationErrorsService} from '../../../services/validation-errors.service';
import {DeliveryAddress} from '../../../models/delivery-address';
import {SharedService} from '../../../services/shared.service';
import {Input} from '../../../models/input';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.less']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy {

  @Output()
  public saveAddressChanges: EventEmitter<void> = new EventEmitter();

  public inputs: Input[] = [
    {
      field: 'Country',
      type: 'text',
      formControl: 'country'
    },
    {
      field: 'City',
      type: 'text',
      formControl: 'city'
    },
    {
      field: 'Zip',
      type: 'text',
      formControl: 'zip'
    },
    {
      field: 'Address',
      type: 'text',
      formControl: 'address'
    }
  ];

  private subscription: Subscription = new Subscription();

  public addressForm: FormGroup;
  public errorFields: Map<string, string> = new Map([
    ['country', ''],
    ['city', ''],
    ['zip', ''],
    ['address', '']
  ]);

  public deliveryAddress: DeliveryAddress;
  public isSaved: boolean;
  public isChangeInput: boolean;

  public constructor(
    private formBuilder: FormBuilder,
    private validationErrors: ValidationErrorsService,
    private userService: UserService,
    private sharedService: SharedService) {
  }

  public ngOnInit(): void {
    this.sharedService.profileTitle$.next('Delivery address');
    this.isChangeInput = false;
    this.addressForm = this.formBuilder.group({
      'country': ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[A-Za-z]+$')]],
      'city': ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[A-Za-z]+$')]],
      'zip': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
      'address': ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-z ,0-9]+$')]]
    });
    for (const key of this.errorFields.keys()) {
      this.subscription.add(this.addressForm.controls[key].statusChanges
        .subscribe((status: string) => {
        if (status === 'INVALID') {
          this.errorFields.set(key, this.validationErrors.errorValidationAddress(this.addressForm.controls[key], key));
        }
      }));
    }
    this.subscription.add(this.userService.getUserDeliveryAddress()
      .subscribe((address: DeliveryAddress) => {
      this.deliveryAddress = address;
      for (const key in this.addressForm.controls) {
        this.addressForm.controls[key].setValue(this.deliveryAddress[key]?this.deliveryAddress[key]:'');
      }
    }));
  }

  public changeInput(name: string): void {
    this.isChangeInput = this.addressForm.controls[name].value != this.deliveryAddress[name];
  }

  public saveAddress(): void {
    if (this.isChangeInput) {
      this.subscription.add(this.userService.saveDeliveryAddress(this.addressForm)
        .subscribe(() => {
          this.isSaved = true;
          setTimeout(() => this.isSaved = false, 2000);
          this.isChangeInput = false;
          this.userService.getUserDeliveryAddress()
            .subscribe((address: DeliveryAddress) => {
              this.deliveryAddress = address;
            });
          this.saveAddressChanges.emit();
        }));
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

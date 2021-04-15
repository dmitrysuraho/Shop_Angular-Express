import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationErrorsService} from '../../../services/validation-errors.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {SharedService} from '../../../services/shared.service';
import {Input} from '../../../models/input';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.less']
})
export class PersonalDataComponent implements OnInit, OnDestroy {

  public inputs: Input[] = [
    {
      field: 'First Name',
      type: 'text',
      formControl: 'firstName'
    },
    {
      field: 'Last name',
      type: 'text',
      formControl: 'lastName'
    },
    {
      field: 'Phone',
      type: 'text',
      formControl: 'phone'
    }
  ];

  private subscription: Subscription = new Subscription();

  public personalDataForm: FormGroup;
  public errorFields: Map<string, string> = new Map([
    ['firstName', ''],
    ['lastName', ''],
    ['phone', '']
  ]);

  public user: User;
  public isChangeInput: boolean;
  public isSaved: boolean;

  public constructor(
    private formBuilder: FormBuilder,
    private validationErrors: ValidationErrorsService,
    private userService: UserService,
    private sharedService: SharedService) {
  }

  public ngOnInit(): void {
    this.sharedService.profileTitle$.next('Personal data');
    this.isChangeInput = false;
    this.personalDataForm = this.formBuilder.group({
      'firstName': ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[A-Za-z]+$')]],
      'lastName': ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[A-Za-z]+$')]],
      'phone': ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30), Validators.pattern('^(\\+)?(\\(\\d{2,3}\\) ?\\d|\\d)(([ \\-]?\\d)|( ?\\(\\d{2,3}\\) ?)){5,12}\\d$')]]
    });
    for (const key of this.errorFields.keys()) {
      this.subscription.add(this.personalDataForm.controls[key].statusChanges
        .subscribe((status: string) => {
        if (status === 'INVALID') {
          this.errorFields.set(key, this.validationErrors.errorValidationField(this.personalDataForm.controls[key], key));
        }
      }));
    }
    this.subscription.add(this.userService.getUserPersonalData()
      .subscribe((user: User) => {
      this.user = user;
      for (const key in this.personalDataForm.controls) {
        this.personalDataForm.controls[key].setValue(this.user[key]?this.user[key]:'');
      }
    }));
  }

  public changeInput(name: string): void {
    this.isChangeInput = this.personalDataForm.controls[name].value != this.user[name];
  }

  public savePersonalData(): void {
    if (this.isChangeInput) {
      this.subscription.add(this.userService.savePersonalData(this.personalDataForm)
        .subscribe(() => {
          this.isSaved = true;
          setTimeout(() => this.isSaved = false, 2000);
          this.isChangeInput = false;
          this.userService.getUserPersonalData()
            .subscribe((user: User) => {
              this.user = user;
            });
        }));
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

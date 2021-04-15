import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ValidationErrorsService} from '../../services/validation-errors.service';
import {AuthService} from '../../services/auth.service';
import {Routing} from '../../import-data/routing.enum';
import {Input} from '../../models/input';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public inputs: Input[] = [
    {
      field: 'E-mail',
      type: 'email',
      formControl: 'email'
    },
    {
      field: 'Password',
      type: 'password',
      formControl: 'password'
    },
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

  public readonly Routing: typeof Routing = Routing;

  private subscription: Subscription = new Subscription();

  public registrationForm: FormGroup;
  public loading: boolean;
  public errorMessage : string;

  public errorFields: Map<string, string> = new Map([
    ['email', ''],
    ['password', ''],
    ['firstName', ''],
    ['lastName', ''],
    ['phone', '']
  ]);

  public isUser: boolean = false;

  public constructor(
    private formBuilder: FormBuilder,
    private validationErrors: ValidationErrorsService,
    private authService: AuthService,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.loading = false;
    this.registrationForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^[A-Za-z1-9!@#$%^&*()_+]+$')]],
      'firstName': ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[A-Za-z]+$')]],
      'lastName': ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^[A-Za-z]+$')]],
      'phone': ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30), Validators.pattern('^(\\+)?(\\(\\d{2,3}\\) ?\\d|\\d)(([ \\-]?\\d)|( ?\\(\\d{2,3}\\) ?)){5,12}\\d$')]]
    });
    for (const key of this.errorFields.keys()) {
      this.subscription.add(this.registrationForm.controls[key].statusChanges
        .subscribe((status: string) => {
        if (status === 'INVALID') {
          this.errorFields.set(key, this.validationErrors.errorValidationField(this.registrationForm.controls[key], key));
        }
      }));
    }
  }

  public registration(): void {
    this.loading = true;
    this.subscription.add(this.authService.registration(this.registrationForm)
      .subscribe(() => {
        this.isUser = true;
        this.loading = false;
        this.router.navigate(['/authorization']);
      }, (err) => {
        this.isUser = false;
        this.loading = false;
        this.errorMessage = err.error.message;
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

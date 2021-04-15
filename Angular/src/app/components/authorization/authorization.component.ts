import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationErrorsService} from '../../services/validation-errors.service';
import {AuthService} from '../../services/auth.service';
import {Routing} from '../../import-data/routing.enum';
import {Input} from '../../models/input';
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent implements OnInit, OnDestroy {

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
    }
  ];

  private subscription: Subscription = new Subscription();

  public readonly Routing: typeof Routing = Routing;

  public authorizationForm: FormGroup;
  public errorFields: Map<string, string> = new Map([
    ['email', ''],
    ['password', '']
  ]);

  public loading: boolean;
  public isUser: boolean = false;
  public errorMessage : string;

  public constructor(
    private formBuilder: FormBuilder,
    private validationErrors: ValidationErrorsService,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private basketService: BasketService) {
  }

  public ngOnInit(): void {
    this.loading = false;
    this.authorizationForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^[A-Za-z1-9!@#$%^&*()_+]+$')]]
    });
    for (const key of this.errorFields.keys()) {
      this.subscription.add(this.authorizationForm.controls[key].statusChanges
        .subscribe((status: string) => {
        if (status === 'INVALID') {
          this.errorFields.set(key, this.validationErrors.errorValidationField(this.authorizationForm.controls[key], key));
        }
      }));
    }
  }

  public authorization(): void {
    this.loading = true;
    this.subscription.add(this.authService.authorization(this.authorizationForm)
      .subscribe((token: {token: string}) => {
        localStorage.setItem('token', token.token);
        this.isUser = false;
        this.loading = false;
        this.router.navigateByUrl(localStorage.getItem('path'));
        localStorage.removeItem('path');
      }, (err) => {
        this.isUser = true;
        this.loading = false;
        this.errorMessage = err.error.message;
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

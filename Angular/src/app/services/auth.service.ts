import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Routing} from "../import-data/routing.enum";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable()
export class AuthService {

  public readonly Routing: typeof Routing = Routing;

  public constructor(
    private router: Router,
    private http: HttpClient) {
  }

  public registration(form: FormGroup): Observable<User> {
    return this.http.post<User>(`${Routing.DOMAIN}/api/auth/register`, {
      email: form.controls['email'].value,
      password: form.controls['password'].value,
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      phone: form.controls['phone'].value
    });
  }

  public authorization(form: FormGroup): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.Routing.DOMAIN}/api/auth/login`, {
      'email': form.controls['email'].value,
      'password': form.controls['password'].value
    });
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/authorization']);
  }
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './guards/auth.guard';
import {HeaderModule} from './components/header/header.module';
import {FooterModule} from './components/footer/footer.module';
import {OrderingGuard} from './guards/ordering.guard';
import {AuthService} from './services/auth.service';
import {BasketService} from './services/basket.service';
import {MenuService} from './services/menu.service';
import {OrdersService} from './services/orders.service';
import {ProductsService} from './services/products.service';
import {SharedService} from './services/shared.service';
import {UserService} from './services/user.service';
import {ValidationErrorsService} from './services/validation-errors.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./services/token.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    FooterModule
  ],
  providers: [
    AuthGuard,
    OrderingGuard,
    AuthService,
    BasketService,
    MenuService,
    OrdersService,
    ProductsService,
    SharedService,
    UserService,
    ValidationErrorsService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

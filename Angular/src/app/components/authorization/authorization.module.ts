import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationComponent} from './authorization.component';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: AuthorizationComponent}
];

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  bootstrap: [AuthorizationComponent]
})
export class AuthorizationModule {
}

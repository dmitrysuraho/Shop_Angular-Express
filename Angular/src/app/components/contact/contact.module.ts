import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact.component';
import {AgmCoreModule} from '@agm/core';

const routes: Routes = [
  {path: '', component: ContactComponent}
];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPKmGV_FE-hbNy1acyHyEdBNbVNyYGqRk'
    })
  ],
  bootstrap: [ContactComponent]
})
export class ContactModule {
}

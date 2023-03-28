import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CurrencyIndexComponent} from "./features/currency/pages/currency-index/currency-index.component";

const routes: Routes = [
  {
    path: 'currencies',
    component: CurrencyIndexComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

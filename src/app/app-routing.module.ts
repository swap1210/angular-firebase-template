import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculateComponent } from './main/main-body/calculate/calculate.component';
import { LoaderComponent } from './main/main-body/loader/loader.component';
import { SuggestComponent } from './main/main-body/suggest/suggest.component';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'calculator',
    component: CalculateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suggest',
    component: SuggestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'loader',
    component: LoaderComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

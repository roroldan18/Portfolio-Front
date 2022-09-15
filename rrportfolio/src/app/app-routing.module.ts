import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './guards/check-login.guard';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio', 
    component: MainPageComponent,
  },
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [CheckLoginGuard],
  },
  {
    path: '**', 
    component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, MatNativeDateModule]
})
export class AppRoutingModule { }

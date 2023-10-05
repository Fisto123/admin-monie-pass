import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SecondloginComponent } from './auth/secondlogin/secondlogin.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin-login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'confirm-password', component: SecondloginComponent },
  { path: 'change-password', component: ForgotpasswordComponent },
  { path: 'network-error-page', component: ErrorMessageComponent },
  {
    path: ' ',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

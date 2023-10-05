import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class superAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate() {
    if (this.auth.isUserAuthenticated()!) {
      return true;
    } else {
      this.toastr.error('error', ' you are not allowed');
      this.router.navigate(['dashboard']);
      return false;
    }
  }
}

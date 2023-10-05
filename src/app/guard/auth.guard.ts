import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (
      this.auth.getTokenFromLocalStorage() &&
      this.auth.decodedUser().role !== 'client'
    ) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

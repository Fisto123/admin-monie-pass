import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel, superAdminModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { registerModel } from '../models/register.model';
import { confirmEmail } from '../models/confirmMail.model';
import {
  changepasswordModel,
  resetpasswordModel,
} from '../models/resetpassword.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(userdetails: loginModel): Observable<loginModel> {
    return this.http.post<loginModel>(
      `https://api.moniepass.com/api/v1/Auth/login`,
      userdetails
    );
  }
  register(userdetails: registerModel): Observable<registerModel> {
    return this.http.post<registerModel>(
      `https://api.moniepass.com/api/v1/User/create-user`,
      userdetails
    );
  }

  confirmEmail(userdetails: confirmEmail): Observable<confirmEmail> {
    return this.http.post<confirmEmail>(
      'https://api.moniepass.com/api/v1/Auth/confirm-email',
      userdetails
    );
  }
  resetPassword(
    userdetails: resetpasswordModel
  ): Observable<resetpasswordModel> {
    return this.http.post<resetpasswordModel>(
      'https://api.moniepass.com/api/v1/Auth/change-password',
      userdetails
    );
  }
  changePassword(
    userdetails: changepasswordModel
  ): Observable<changepasswordModel> {
    return this.http.post<changepasswordModel>(
      'https://api.moniepass.com/api/v1/Auth/change-password',
      userdetails
    );
  }
  sendCode(userdetails: any): Observable<any> {
    const queryParams = `email=${encodeURIComponent(userdetails.email)}`;
    return this.http.post<any>(
      `https://api.moniepass.com/api/v1/Auth/send-code?${queryParams}`,
      userdetails
    );
  }
  setTokenToLocalStorage(token: string) {
    localStorage.setItem('monieToken', token);
  }
  getTokenFromLocalStorage() {
    return localStorage.getItem('monieToken');
  }
  isUserLoggedIn() {
    return this.getTokenFromLocalStorage();
  }
  decodedUser() {
    const token = this.getTokenFromLocalStorage()!!;
    const JwtHelperService2 = new JwtHelperService();
    const user = JwtHelperService2.decodeToken(token);
    return user;
  }
  decodedUserEmail() {
    const token = this.getTokenFromLocalStorage()!!;
    const JwtHelperService2 = new JwtHelperService();
    const user = JwtHelperService2.decodeToken(token);
    return user.email;
  }
  decodedUserName() {
    const token = this.getTokenFromLocalStorage()!!;
    const JwtHelperService2 = new JwtHelperService();
    const user = JwtHelperService2.decodeToken(token);
    return user.username;
  }
  isUserAuthenticated(): boolean {
    const user = this.decodedUser();
    if (user.role == 'owner' || user.role == 'admin') {
      return true;
    } else {
      return false;
    }
  }
  clearLocalStorage() {
    localStorage.clear();
  }
}

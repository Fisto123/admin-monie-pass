import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usermodel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<usermodel[]> {
    return this.http.get<usermodel[]>('https://api.moniepass.com/api/v1/User');
  }

  getUsers(PageNumber: number, PageSize: number): Observable<usermodel[]> {
    return this.http.get<usermodel[]>(
      `https://api.moniepass.com/api/v1/User?PageNumber=${PageNumber}&PageSize=${PageSize}`
    );
  }
}

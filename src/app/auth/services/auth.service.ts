import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  RegisterRequest,
  CurrentUser,
  AuthResponse,
  loginRequest,
} from '../inetrfaces/auth.interface';
import { PlatformService } from '../../core/services/platform.service';
import { setHeaders } from '../../core/helpers/user-header';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private platformService: PlatformService
  ) {}

  // token = localStorage.getItem('token');

  register(data: RegisterRequest): Observable<CurrentUser> {
    return this.http
      .post<AuthResponse>(environment.apiLink + 'users', data)
      .pipe(map((res) => res.user));
  }

  login(data: loginRequest): Observable<CurrentUser> {
    return this.http
      .post<AuthResponse>(environment.apiLink + 'users/login', data)
      .pipe(map((res) => res.user));
  }

  getCurrentUser() {
    return this.http
      .get<AuthResponse>(environment.apiLink + 'user', {
        headers: setHeaders(),
      })
      .pipe(map((res) => res.user));
  }
}

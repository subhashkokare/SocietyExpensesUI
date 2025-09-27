// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResp { token: string; user?: any; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'se_token';
  private userSub = new BehaviorSubject<any>(this.loadUserFromToken());

  constructor(private http: HttpClient) {}

  // call to login and set token + user
  login(username: string, password: string) {
    return this.http.post<LoginResp>(`${environment.apiBaseUrl}/api/auth/login`, { username, password }).pipe(
      tap(res => {
        if (res?.token) {
          localStorage.setItem(this.tokenKey, res.token);
          // prefer server-provided user if present, otherwise decode token
          const u = res.user ?? this.decodeToken(res.token);
          this.userSub.next(u);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSub.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Observable for components that want to react to changes
  getUser(): Observable<any> {
    return this.userSub.asObservable();
  }

  // synchronous getter used in templates / immediate checks
  getUserValue() {
    return this.userSub.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // helper to set user when you have token (optional usage)
  setUserFromToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.userSub.next(this.decodeToken(token));
  }

  // try to decode JWT payload safely
  private decodeToken(token: string | null) {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub ?? payload.nameid ?? null,
        username: payload.unique_name ?? payload.name ?? null,
        displayName: payload.displayName ?? payload.name ?? payload.unique_name,
        roles: payload.role ?? payload.roles ?? []
      };
    } catch {
      return null;
    }
  }

  // load the user synchronously from an existing token on startup
  private loadUserFromToken() {
    const t = this.getToken();
    if (!t) return null;
    return this.decodeToken(t);
  }
}

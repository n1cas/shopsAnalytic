import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private token: any = null;

  constructor(private http: HttpClient) { 
    this.token = null;
  }

  public login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => this.setToken(token))
      )
  }

  public register(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/register', user)
  }

  private setToken(token:string):void {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }

  public getToken(): string {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logOut(): void {
    this.token = null;
    localStorage.clear();
  }
}

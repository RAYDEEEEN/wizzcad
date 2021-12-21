import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { KEYS } from '@shared/constants';
import { User } from '@shared/interfaces/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _token: string;

  constructor(private http: HttpClient) {
    this._token = localStorage.getItem(KEYS.TOKEN) || '';
  }

  connection(login: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/logins`, {
      params: { login, password }
    });
  }

  get token() {
    return this._token;
  }

  set token(token: string) {
    localStorage.setItem(KEYS.TOKEN, token);
    this._token = token;
  }
}

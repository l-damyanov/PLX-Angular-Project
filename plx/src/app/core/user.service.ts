import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = 'https://parseapi.back4app.com';

  headers = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': 'IeuI9QI8YYccmwWu3DOFKtFcRhLwtpFcVExXE4Fa',
    'X-Parse-REST-API-Key': 'dlf9vABNHrqPn05eyiyB1tZnKmTcfFM4xV8m1oB7',
  }

  // currentUser!: IUser;

  sessionData = this.getUserData();
  sessionUser: any = this.sessionData ? this.sessionData.email : null

  get isLogged() {
    return this.sessionUser;
  }


  setUserData(userData: { email: string, username: string, sessionToken: string }): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData') || "{}");
  }

  clearUserData(): void {
    localStorage.removeItem('userData');
  }

  constructor(private http: HttpClient) { }

  getUser(objectId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.path}/users/${objectId}`, { headers: this.headers });
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.path}/users`, { headers: this.headers })
  }

  login(userData: { email: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(`${this.path}/login/`, userData, { headers: this.headers })
      .pipe(tap(user => this.sessionUser = user));
  }

  register(userData: { username: string, email: string, password: string, phone_number: string }): Observable<IUser> {
    return this.http.post<IUser>(`${this.path}/users/`, userData, { headers: this.headers })
      .pipe(tap(user => this.sessionUser = user));
  }
}

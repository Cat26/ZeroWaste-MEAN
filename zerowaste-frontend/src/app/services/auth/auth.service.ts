import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;


  constructor(private http: HttpClient) { }

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:3000/users/register', user, httpOptions);
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:3000/users/authenticate', user, httpOptions);
  }

  getProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:3000/users/profile', httpOptions);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.user = user;
  }

  loggedIn() {
    return localStorage.getItem('id_token') !== null;
  }

  logout() {
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }
}

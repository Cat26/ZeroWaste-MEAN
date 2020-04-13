import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllEvents() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/events', httpOptions);
  }

//  Profile CRUD
  createEvent(eventData) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken
      })
    };
    return this.http.post('http://localhost:3000/categories/events', eventData, httpOptions);
  };
}

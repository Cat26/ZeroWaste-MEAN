import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getAllEvents() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
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
  }

  deleteEvent(eventId) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken
      })
    };
    return this.http.delete('http://localhost:3000/categories/events/' + eventId + '/delete', httpOptions);
  }

  updateEvent(eventId, eventData) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken
      })
    };
    return this.http.put('http://localhost:3000/categories/events/' + eventId + '/update', eventData, httpOptions);
  }

  getThreeNewestItem() {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/newest', httpOptions);
  }

  sortEventsByDateDescending() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/events/sort-desc', httpOptions);
  }

  sortEventsByDateAscending() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/events/sort-asc', httpOptions);
  }

  filterEventsByOwner(filterQuery) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/events/filter/owner/' + filterQuery, httpOptions);
  }

  filterEventsByName(filterQuery) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/events/filter/eventName/' + filterQuery, httpOptions);
  }

  filterEventsByDescription(filterQuery) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/events/filter/eventDescription/' + filterQuery, httpOptions);
  }

  getUserCalendarEvents() {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken
      })
    };
    return this.http.get('http://localhost:3000/users/calendar', httpOptions);
  }
}

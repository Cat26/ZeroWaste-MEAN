import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../services/events/events.service";

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit {
  today = new Date().toDateString();
  eventsInCalendar : [{eventDate: string, name: string, _id: string}];
  todayEvents = [];

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.getEventsToCalendar();
  }

  compareDates(dateOne, dateTwo) {
    let dateOneAsDate = new Date(dateOne);
    let dateTwoAsDate = new Date(dateTwo);
    return dateOneAsDate.getFullYear() === dateTwoAsDate.getFullYear() && dateOneAsDate.getMonth() === dateTwoAsDate.getMonth() && dateOneAsDate.getDate() === dateTwoAsDate.getDate();
  }

  getHourAndMinutes(dateString) {
    let date = new Date(dateString);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let additionalZero = '';
    if(minutes.toString().length === 1) {
      additionalZero = '0';
    }
    return `${hour} : ${additionalZero}${minutes}`;
  }

  getEventsToCalendar() {
    this.eventService.getUserCalendarEvents().subscribe( (events: any) => {
      this.todayEvents = events.eventsCalendar.filter(event => this.compareDates(event.eventDate, this.today));
      this.eventsInCalendar = events.eventsCalendar.filter(event => !this.compareDates(event.eventDate, this.today));
      console.log(this.todayEvents)
      console.log(this.eventsInCalendar)

    }, error => {
        console.log(error);
        return false;
      })
  }

}

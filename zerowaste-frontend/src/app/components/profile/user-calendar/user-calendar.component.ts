import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../services/events/events.service";
import * as moment from "moment";
import { EmitEventService } from "../../../services/emitter/emit-event.service";

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit {
  today = new Date().toDateString();
  eventsInCalendar : [{eventDate: string, name: string, _id: string}];
  todayEvents : [{eventDate: string, name: string, _id: string}];
  allEventsInCalendarVisible = false;
  clickedEvent: {
    name: string,
    description: string,
    eventImage: string,
    eventDate: string,
    likesUserList: string[],
    dislikesUserList: string[],
    participants: string[],
    owner: { username: string },
    _id: string
  };

  constructor(
    private eventService: EventsService,
    private emitEventService: EmitEventService
  ) { }

  ngOnInit(): void {
    this.getEventsToCalendar();
    this.emitEventService.updateEventListener().subscribe(msg => {
      if(this.clickedEvent) {
        this.onClickEventInfo(this.clickedEvent._id);
      }
    })
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

  formatDate(date) {
    let formatedDate = moment(date).format('LLLL');
    return formatedDate;
  }

  getEventsToCalendar() {
    this.eventService.getUserCalendarEvents().subscribe( (events: any) => {
      this.todayEvents = events.eventsCalendar.filter(event => this.compareDates(event.eventDate, this.today));
      this.eventsInCalendar = events.eventsCalendar.filter(event => !this.compareDates(event.eventDate, this.today));
      if(events.eventsCalendar[0]) {
        this.onClickEventInfo(events.eventsCalendar[0]._id);
      }

    }, error => {
        console.log(error);
        return false;
      })
  }

  showHideOtherEvents() {
    this.allEventsInCalendarVisible = !this.allEventsInCalendarVisible;
  }

  onClickEventInfo(eventId) {
    this.eventService.getEventsDetails(eventId).subscribe((event: any) => {
      this.clickedEvent = event.event;
    }, error => {
      console.log(error);
      return false;
    })
  }

}

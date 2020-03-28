import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../services/events/events.service";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events = [];

  constructor(
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((events: any) => {
      this.events = events;
      console.log(events)
    },
    error => {
      console.log(error);
      return false;
    });
  }

}

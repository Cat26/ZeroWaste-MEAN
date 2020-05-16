import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events/events.service';
import { EmitEventService } from "../../../services/emitter/emit-event.service";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events = [];

  constructor(
    private eventService: EventsService,
    private emitEventService: EmitEventService
  ) {
  }

  ngOnInit(): void {
    this.emitEventService.updateEventListener().subscribe(msg => {
      this.getAllEvents();
    });

    this.emitEventService.manageEventsListener().subscribe((query: any) => {
      if (query.option == "asc") {
        this.sortEventsByDateAscending();
      } else if (query.option == "desc") {
        this.sortEventsByDateDescending();
      } else if (query.option == "reset") {
        this.getAllEvents();
      } else if (query.option == "owner") {
        this.filterEventsByOwner(query.query);
      } else if (query.option == "name") {
        this.filterEventsByName(query.query)
      } else if (query.option == "description") {
        this.filterEventsByDescription(query.query)
      } else return;
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((events: any) => {
        this.events = events.events;
      },
      error => {
        console.log(error);
        return false;
      });
  }

  sortEventsByDateAscending() {
    this.eventService.sortEventsByDateAscending().subscribe((events: any) => {
        this.events = events.events;
      },
      error => {
        console.log(error);
        return false;
      });
  }

  sortEventsByDateDescending() {
    this.eventService.sortEventsByDateDescending().subscribe((events: any) => {
        this.events = events.events;
      },
      error => {
        console.log(error);
        return false;
      });
  }

  filterEventsByOwner(query) {
    this.eventService.filterEventsByOwner(query).subscribe((events: any) => {
        this.events = events.events;
      },
      error => {
        console.log(error);
        return false;
    });
  }

  filterEventsByName(query) {
    this.eventService.filterEventsByName(query).subscribe((events: any) => {
        this.events = events.events;
      },
      error => {
        console.log(error);
        return false;
      });
  }

  filterEventsByDescription(query) {
    this.eventService.filterEventsByDescription(query).subscribe((events: any) => {
        this.events = events.events;
      },
      error => {
        console.log(error);
        return false;
      });
  }

}

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
    this.emitEventService.updateEventListener().subscribe(msg =>{
      this.getAllEvents();
    })
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((events: any) => {
        this.events = events.events;
        console.log(events.events);
      },
      error => {
        console.log(error);
        return false;
      });
  }

}

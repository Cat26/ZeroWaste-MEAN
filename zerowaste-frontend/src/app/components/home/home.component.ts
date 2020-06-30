import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../services/events/events.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events = [];
  constructor(
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    this.eventService.getThreeNewestItem().subscribe((events: any) => {
      this.events = events.events;
      console.log(events.events);
    },
    error => {
      console.log(error);
      return false;
    });
  }
}

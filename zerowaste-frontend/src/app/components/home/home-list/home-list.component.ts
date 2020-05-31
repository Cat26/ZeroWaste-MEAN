import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events/events.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  events = [];
  constructor(
    private eventService: EventsService
  ) {  }

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

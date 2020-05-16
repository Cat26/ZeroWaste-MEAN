import { Component, OnInit } from '@angular/core';
import { EmitEventService } from "../../../services/emitter/emit-event.service";
import { EventsService } from "../../../services/events/events.service";

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css']
})
export class EventsManagerComponent implements OnInit {
  query = '';
  selectedFilter = 'owner';

  constructor(private emitEventService: EmitEventService) {
  }

  ngOnInit(): void {

  }

  sortAscendingQuery() {
    this.emitEventService.emitManageEvents({option: 'asc', query: null})
  }

  sortDescendingQuery() {
    this.emitEventService.emitManageEvents({option: 'desc', query: null})
  }

  filterQuery() {
    this.emitEventService.emitManageEvents({option: this.selectedFilter, query: this.query})
  }

  resetQuery() {
    this.emitEventService.emitManageEvents({option: 'reset', query: null})
  }

}

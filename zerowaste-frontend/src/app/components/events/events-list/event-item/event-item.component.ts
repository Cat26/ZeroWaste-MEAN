import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  @Input() eventItem: {
    name: string,
    description: string,
    eventImage: string,
    eventDate: string,
    owner: {username: string},
    _id: string};

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(date) {
    let formatedDate = moment(date).format('LLLL')
    return formatedDate
  }

}

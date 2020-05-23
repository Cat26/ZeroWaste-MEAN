import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-item-modal',
  templateUrl: './calendar-item-modal.component.html',
  styleUrls: ['./calendar-item-modal.component.css']
})
export class CalendarItemModalComponent implements OnInit {
  @Input() eventItem: {
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

  constructor() {
  }

  ngOnInit(): void {
  }

}

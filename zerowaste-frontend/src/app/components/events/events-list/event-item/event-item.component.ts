import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../../../services/auth/auth.service';

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
    likesUserList: [],
    dislikesUserList: [],
    participants: [],
    owner: { username: string },
    _id: string
  };

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  formatDate(date) {
    let formatedDate = moment(date).format('LLLL');
    return formatedDate;
  }

}

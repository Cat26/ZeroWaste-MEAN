import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']
})
export class HomeItemComponent implements OnInit {
  @Input() eventItem: {
    name: string,
    description: string,
    eventImage: string,
    eventDate: string,
    _id: string};

  constructor() { }

  ngOnInit(): void {
  }
  formatDate(date) {
    let formatedDate = moment(date).format('LLL');
    return formatedDate;
  }

}

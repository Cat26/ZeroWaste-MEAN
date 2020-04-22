import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-events-list',
  templateUrl: './user-events-list.component.html',
  styleUrls: ['./user-events-list.component.css']
})
export class UserEventsListComponent implements OnInit {
  @Input() userEvents: [];

  constructor() { }

  ngOnInit(): void {
  }

}

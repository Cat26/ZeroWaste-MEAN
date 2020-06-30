import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-shops-list',
  templateUrl: './user-shops-list.component.html',
  styleUrls: ['./user-shops-list.component.css']
})
export class UserShopsListComponent implements OnInit {
  @Input() userShops: [];

  constructor() { }

  ngOnInit(): void {
  }

}

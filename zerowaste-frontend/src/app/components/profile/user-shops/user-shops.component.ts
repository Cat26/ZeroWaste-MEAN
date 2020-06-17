import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-shops',
  templateUrl: './user-shops.component.html',
  styleUrls: ['./user-shops.component.css']
})
export class UserShopsComponent implements OnInit {
  @Input() userShops: [];

  constructor() { }

  ngOnInit(): void {
  }

}

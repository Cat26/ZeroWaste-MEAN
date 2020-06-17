import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent implements OnInit {
  @Input() addressItem: {
    street: string,
    buildingNumber: number,
    apartmentNumber: number,
    postCode: string,
    cityName: string,
    _id: string
  };

  constructor() { }

  ngOnInit(): void {
  }

}

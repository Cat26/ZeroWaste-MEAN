import {Component, Input, OnInit} from '@angular/core';
import {AddressService} from '../../services/address/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address = [];
  @ Input() shopAddressId: string
  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.getAddressById(this.shopAddressId)
  }

  getAddressById(addressId) {
    this.addressService.getAddressById(addressId).subscribe((address: any) => {
      this.address = address.address;
      console.log(address);
      return true;
    },
      error => {
      console.log(error);
      return false;
      })
  }

}

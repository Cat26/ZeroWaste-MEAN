import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AddressService} from '../../../services/address/address.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {
  addressForm = new FormGroup({
    street: new FormControl(''),
    buildingNumber: new FormControl(''),
    apartmentNumber: new FormControl(''),
    postCode: new FormControl(''),
    cityName: new FormControl('')
  });

  constructor(
    private addressService: AddressService,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit(): void {
  }

  clearFormData() {
    this.addressForm.reset();
  }

  submitAddressCall() {
    const formObj = this.addressForm.getRawValue();
    const serializedForm = JSON.stringify(formObj);

    this.addressService.createAddress(serializedForm).subscribe(
      (res: any) => {
        if (res.success) {
          this.flashMessage.show(
            res.msg,
            {cssClass: 'alert-success', timeout: 3000}
          );
          this.clearFormData();
        } else {
          this.flashMessage.show(
            res.msg,
            {cssClass: 'alert-danger', timeout: 5000}
          );
          console.log(res.error);
        }
      }
    );
  }

  submitAddress(data) {
    this.addressService.createAddress(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.flashMessage.show(
            res.msg,
            {cssClass: 'alert-success', timeout: 3000}
          );
          console.log(res.idAddress);
          this.clearFormData();
          return res.idAddress;
        } else {
          this.flashMessage.show(
            res.msg,
            {cssClass: 'alert-danger', timeout: 5000}
          );
          console.log(res.error);
        }
      }
    );
  }
}

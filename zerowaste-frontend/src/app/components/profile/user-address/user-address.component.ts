import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddressService } from '../../../services/address/address.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { stringify } from "querystring";
import { EmitShopService } from "../../../services/emitter/emit-shop.service";

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {
  addressId = '';
  isNew = true;
  addressForm = new FormGroup({
    street: new FormControl(''),
    buildingNumber: new FormControl(''),
    apartmentNumber: new FormControl(''),
    postCode: new FormControl(''),
    cityName: new FormControl('')
  });

  @Output() addressCreated = new EventEmitter<string>();

  constructor(
    private addressService: AddressService,
    private flashMessage: FlashMessagesService,
    private emitShopService: EmitShopService
  ) {
  }

  ngOnInit(): void {
  }

  clearFormData() {
    this.addressForm.reset();
  }

  loadDataToUpdate(address) {
    this.addressId = address._id;
    this.isNew = false;
    this.addressForm.patchValue({
      street: address.street,
      buildingNumber: address.buildingNumber,
      apartmentNumber: address.apartmentNumber,
      postCode: address.postCode,
      cityName: address.cityName
    });
  }

  submitAddress() {
    let addressFormObj = this.addressForm.getRawValue();
    let serializedAddressForm = JSON.stringify(addressFormObj);
    if(this.isNew) {
      this.addressService.createAddress(serializedAddressForm).subscribe(
        (res: any) => {
          if (res.success) {
            this.addressCreated.emit(res.addressId);
            this.flashMessage.show(
              res.msg,
              {cssClass: 'alert-success', timeout: 3000}
            );
          } else {
            this.flashMessage.show(
              res.msg,
              {cssClass: 'alert-danger', timeout: 5000}
            );
            console.log(res.error);
          }
        }
      );
    } else {
      this.addressService.updateAddress(this.addressId, serializedAddressForm).subscribe(
        (res: any) => {
          if (res.success) {
            this.isNew = true;
            this.emitShopService.emitDeleteCreateShop('address updated');
            this.flashMessage.show(
              res.msg,
              {cssClass: 'alert-success', timeout: 3000}
            );
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
}

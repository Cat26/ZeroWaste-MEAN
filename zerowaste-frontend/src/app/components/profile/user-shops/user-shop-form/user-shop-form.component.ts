import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ShopsService } from '../../../../services/shops/shops.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../../services/validate/validate.service';
import { EmitShopService } from '../../../../services/emitter/emit-shop.service';
import { now } from 'moment';
import { UserAddressComponent } from '../../user-address/user-address.component';
import { AddressService } from "../../../../services/address/address.service";

@Component({
  selector: 'app-user-shop-form',
  templateUrl: './user-shop-form.component.html',
  styleUrls: ['./user-shop-form.component.css']
})

export class UserShopFormComponent implements OnInit {
  @ViewChild(UserAddressComponent) child: UserAddressComponent;
  shopFormDisabled: boolean;
  addressId = '';
  address;
  shopForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    enabled: new FormControl(true),
    description: new FormControl(''),
    updatedAt: new FormControl('')
  });

  isInitCall = true;
  isNewShop = true;
  shopUpdateId = undefined;

  constructor(
    private shopsService: ShopsService,
    private formBuilder: FormBuilder,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private emitShopService: EmitShopService,
    private addressService: AddressService
  ) {
  }

  ngOnInit(): void {
    this.shopFormDisabled = true;
    this.shopForm.disable();
    this.emitShopService.updateShopListener().subscribe(
      (shopData: any) => {
        if (this.isInitCall) {
          this.isInitCall = false;
        } else {
          this.loadDataToUpdate(shopData);
        }
      }
    );
  }


  loadDataToUpdate(updateShopData) {
    this.shopForm.enable();
    this.shopFormDisabled = false;
    this.isNewShop = false;
    this.shopUpdateId = updateShopData.shop._id;
    this.shopForm.patchValue({
      name: updateShopData.shop.name,
      email: updateShopData.shop.email,
      phoneNumber: updateShopData.shop.phoneNumber,
      description: updateShopData.shop.description
    });
    this.child.loadDataToUpdate(updateShopData.address.address);
  }

  clearFormData() {
    this.shopForm.reset();
    this.child.clearFormData();
    this.isNewShop = true;
    this.shopUpdateId = undefined;
    this.addressId = '';
    this.shopFormDisabled = true;
    this.shopForm.disable();
  }

  submitShopCall() {
    this.shopForm.patchValue({updatedAt: now()});
    this.shopForm.patchValue({shopAddress: this.addressId});
    let formObj = this.shopForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);

    if (this.isNewShop) {
      this.shopsService.createShop(serializedForm).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitShopService.emitDeleteCreateShop('shop created');
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
    } else {
      this.shopsService.updateShop(this.shopUpdateId, serializedForm).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitShopService.emitDeleteCreateShop('shop updated');
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
  }

  enableShopForm(addressId) {
    this.shopFormDisabled = false;
    this.addressId = addressId;
    this.shopForm.enable();
  }
}

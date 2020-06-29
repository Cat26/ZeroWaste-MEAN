import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ShopsService} from '../../../../services/shops/shops.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../../../services/validate/validate.service';
import {EmitShopService} from '../../../../services/emitter/emit-shop.service';
import {now} from 'moment';
import { UserAddressComponent } from '../../user-address/user-address.component';

@Component({
  selector: 'app-user-shop-form',
  templateUrl: './user-shop-form.component.html',
  styleUrls: ['./user-shop-form.component.css']
})

export class UserShopFormComponent implements OnInit {
  shopForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    enabled: new FormControl(true),
    description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    updatedAt: new FormControl(''),
    shopAddress: new FormControl('')
  });
  addressForm = new FormGroup({
    street: new FormControl(''),
    buildingNumber: new FormControl(''),
    apartmentNumber: new FormControl(''),
    postCode: new FormControl(''),
    cityName: new FormControl('')
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
    private userAddressComponent: UserAddressComponent
  ) { }

  ngOnInit(): void {
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
    this.isNewShop = false;
    this.shopUpdateId = updateShopData._id;
    this.shopForm.patchValue({
      name: updateShopData.name
    });
  }

  clearFormData() {
    this.shopForm.reset();
    this.addressForm.reset();
    this.isNewShop = true;
    this.shopUpdateId = undefined;
  }

  submitShopCall() {
    const addressFormObj = this.addressForm.getRawValue();
    const serializedAddressForm = JSON.stringify(addressFormObj);
    this.shopForm.patchValue({updatedAt : now()});
    this.shopForm.patchValue({shopAddress : this.userAddressComponent.submitAddress(serializedAddressForm)});
    this.shopForm.patchValue({shopAddress : '5efa5a9bdb21934b78f60b31'});

    console.log(this.shopForm);
    const formObj = this.shopForm.getRawValue();
    const serializedForm = JSON.stringify(formObj);

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
}

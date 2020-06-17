import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ShopsService} from '../../../../services/shops/shops.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../../../services/validate/validate.service';
import {EmitEventService} from '../../../../services/emitter/emit-event.service';

@Component({
  selector: 'app-user-shop-form',
  templateUrl: './user-shop-form.component.html',
  styleUrls: ['./user-shop-form.component.css']
})
export class UserShopFormComponent implements OnInit {
  shopForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  isInitCall = true;
  isNewShop = true;
  shopUpdateId = undefined;

  constructor(
    private shopsService: ShopsService,
    private formBuilder: FormBuilder,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private emitEventService: EmitEventService
  ) { }

  ngOnInit(): void {
    this.emitEventService.updateEventListener().subscribe(
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
      name: updateShopData.name,
      email: updateShopData.email,
      phoneNumber: updateShopData.phoneNumber
    });
  }

  clearFormData() {
    this.shopForm.reset();
    this.isNewShop = true;
    this.shopUpdateId = undefined;
  }
  submitEventCall() {
    if (!this.validateService.validateShop(this.shopForm, !this.isNewShop)) {
      this.flashMessage.show(
        'Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000}
      );
      return false;
    }

    const formData = new FormData();
    formData.append('name', this.shopForm.get('name').value);
    formData.append('email', this.shopForm.get('email').value);
    formData.append('phoneNumber', this.shopForm.get('phoneNumber').value);
    if (this.isNewShop) {
      this.shopsService.createShop(formData).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitEventService.emitDeleteCreateEvent('shop created');
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
      this.shopsService.updateShop(this.shopUpdateId, formData).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitEventService.emitDeleteCreateEvent('shop updated');
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

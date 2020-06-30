import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {ShopsService} from '../../../../../services/shops/shops.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {EmitShopService} from '../../../../../services/emitter/emit-shop.service';
import { AddressService } from "../../../../../services/address/address.service";

@Component({
  selector: 'app-user-shops-item',
  templateUrl: './user-shops-item.component.html',
  styleUrls: ['./user-shops-item.component.css']
})
export class UserShopsItemComponent implements OnInit, AfterViewInit {
  shopAddress;
  @Input() userShopItem: {
    name: string,
    email: string,
    phoneNumber: string,
    shopAddress: string,
    description: string,
    _id: string
  };

  constructor(
    private shopsService: ShopsService,
    private flashMessage: FlashMessagesService,
    private emitShopService: EmitShopService,
    private addressService: AddressService
  ) { }


  ngOnInit(): void {
    this.addressService.getAddressById(this.userShopItem.shopAddress).subscribe((address: any) => {
        this.shopAddress = address;
        return true;
      },
      error => {
        console.log(error);
        return false;
      });
  }

  ngAfterViewInit() {

  }

  deleteShop() {
    this.shopsService.deleteShop(this.userShopItem._id).subscribe((res: any) => {
      if (res.success) {
        this.emitShopService.emitDeleteCreateShop('Shop deleted');
        this.flashMessage.show(
          res.msg, {
          cssClass: 'alert-success',
          thimeout: 3000
        });
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        console.log(res.error);
      }
    });
  }

  updateShop(shopItem) {
    this.emitShopService.emitUpdateShop({shop: shopItem, address: this.shopAddress});
  }
}

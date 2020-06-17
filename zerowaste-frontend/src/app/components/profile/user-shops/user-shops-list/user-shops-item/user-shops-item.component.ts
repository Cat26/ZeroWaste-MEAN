import {Component, Input, OnInit} from '@angular/core';
import {ShopsService} from '../../../../../services/shops/shops.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {EmitEventService} from '../../../../../services/emitter/emit-event.service';

@Component({
  selector: 'app-user-shops-item',
  templateUrl: './user-shops-item.component.html',
  styleUrls: ['./user-shops-item.component.css']
})
export class UserShopsItemComponent implements OnInit {
  @Input() userShopItem: {
    name: string,
    email: string,
    phoneNumber: string,
    _id: string
  };

  constructor(
    private shopsService: ShopsService,
    private flashMessage: FlashMessagesService,
    private emitEventService: EmitEventService
  ) { }

  ngOnInit(): void {
  }

  deleteShop() {
    this.shopsService.deleteShop(this.userShopItem._id).subscribe((res: any) => {
      if (res.success) {
        this.emitEventService.emitDeleteCreateEvent('Shop deleted');
        this.flashMessage.show(res.msg, {
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
    this.emitEventService.emitUpdateEvent(shopItem);
  }
}

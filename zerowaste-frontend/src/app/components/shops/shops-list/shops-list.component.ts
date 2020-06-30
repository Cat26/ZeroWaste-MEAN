import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../../../services/shops/shops.service';
import { EmitShopService } from '../../../services/emitter/emit-shop.service';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {
  shops = [];
  constructor(
    private shopsService: ShopsService,
    private emitShopService: EmitShopService
  ) { }

  ngOnInit(): void {
    this.emitShopService.updateShopListener().subscribe(msg => {
      this.getAllShops();
    });
  }

  getAllShops(){
    this.shopsService.getAllShops().subscribe((shops: any) => {
      this.shops = shops.shops;
    },
      error => {
      console.log(error);
      return false;
      });
  }
}

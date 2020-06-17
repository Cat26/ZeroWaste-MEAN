import { Component, OnInit } from '@angular/core';
import {ShopsService} from "../../../services/shops/shops.service";

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {
  shops = [];
  constructor(
    private shopsService: ShopsService
  ) { }

  ngOnInit(): void {
    this.getAllShops();
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

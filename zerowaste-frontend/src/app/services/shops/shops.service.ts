import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllShops() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/shops', httpOptions);
  }

  getShopById(shopId, shopData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/categories/shops/' + shopId + '/info', httpOptions);
  }

  createShop(shopData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/categories/newShop', shopData, httpOptions);
  }

  deleteShop(shopId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete('http://localhost:3000/categories/shops/' + shopId + '/delete', httpOptions);
  }

  updateShop(shopId, shopData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put('http://localhost:3000/categories/shops/' + shopId + '/update', shopData, httpOptions);
  }
}

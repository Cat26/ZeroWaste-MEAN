import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
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
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken
      })
    };
    return this.http.post('http://localhost:3000/categories/newShop', shopData, httpOptions);
  }

  deleteShop(shopId) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken
      })
    };
    return this.http.delete('http://localhost:3000/categories/shops/' + shopId + '/delete', httpOptions);
  }

  updateShop(shopId, shopData) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken
      })
    };
    return this.http.put('http://localhost:3000/categories/shops/' + shopId + '/update', shopData, httpOptions);
  }
}

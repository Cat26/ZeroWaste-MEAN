import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitShopService {
  private createDeleteActionShop = new BehaviorSubject<string>('');
  private updateActionShop = new BehaviorSubject<string>('');
  private manageActionShop = new BehaviorSubject<string>('');

  constructor() { }

  emitDeleteCreateShop(msg: string) {
    this.createDeleteActionShop.next(msg);
  }

  updateShopListener() {
    return this.updateActionShop.asObservable();
  }

  emitUpdateShop(shopData) {
    this.updateActionShop.next(shopData);
  }
}

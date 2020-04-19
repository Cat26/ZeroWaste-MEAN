import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmitEventService {
  private childActionEvent = new BehaviorSubject<string>('');

  constructor() {
  }
  emitChildEvent(msg: string) {
    this.childActionEvent.next(msg)
  }

  childEventListener() {
    return this.childActionEvent.asObservable();
  }
}

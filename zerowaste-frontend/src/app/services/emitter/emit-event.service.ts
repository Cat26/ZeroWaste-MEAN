import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmitEventService {
  private createDeleteActionEvent = new BehaviorSubject<string>('');
  private updateActionEvent = new BehaviorSubject<string>('');

  constructor() {
  }

  emitDeleteCreateEvent(msg: string) {
    this.createDeleteActionEvent.next(msg)
  }

  deleteCreateEventListener() {
    return this.createDeleteActionEvent.asObservable();
  }

  emitUpdateEvent(eventData) {
    this.updateActionEvent.next(eventData);
  }

  updateEventListener(){
    return this.updateActionEvent.asObservable();
  }
}

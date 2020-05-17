import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() {
  }

  validateRegister(user) {
    if (user.name == undefined || user.email == undefined || user.password == undefined || user.username == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateEvent(eventForm, update) {
    if (eventForm.get('name').value && eventForm.get('description').value && eventForm.get('eventDate').value && eventForm.get('eventLocation').value) {
      if (update) {
        return true;
      } else if (eventForm.get('eventImage').value) {
        return true;
      }
    }
    return false;
  }

  validateShop(shopForm, update) {
    if (shopForm.get('name').value && shopForm.get('description').value) {
        return true;
      }
    return false;
  }
}

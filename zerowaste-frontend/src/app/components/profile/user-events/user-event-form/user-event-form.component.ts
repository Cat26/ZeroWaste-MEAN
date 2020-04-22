import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../../services/events/events.service";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "../../../../services/validate/validate.service";
import { EmitEventService } from "../../../../services/emitter/emit-event.service";
import * as moment from 'moment';

@Component({
  selector: 'app-user-event-form',
  templateUrl: './user-event-form.component.html',
  styleUrls: ['./user-event-form.component.css']
})
export class UserEventFormComponent implements OnInit {
  eventForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    eventImage: new FormControl(['']),
    eventDate: new FormControl(''),
    eventLocation: new FormControl('')
  });

  eventFile = undefined;
  isNewEvent = true;
  isInitCall = true;
  eventUpdatePhoto = '';
  eventUpdateId = undefined;

  constructor(
    private eventService: EventsService,
    private formBuilder: FormBuilder,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private emitEventService: EmitEventService
  ) {
  }

  ngOnInit(): void {
    this.emitEventService.updateEventListener().subscribe(
      (eventData: any) => {
        if (this.isInitCall) {
          this.isInitCall = false;
        } else {
          this.loadDataToUpdate(eventData)
        }
      }
    )
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.eventFile = event.target.files[0];
    }
  }


  loadDataToUpdate(updateEventData) {
    this.isNewEvent = false;
    this.eventUpdatePhoto = updateEventData.eventImage;
    this.eventUpdateId = updateEventData._id;
    // this.eventFile = undefined;
    this.eventForm.patchValue({
      name: updateEventData.name,
      description: updateEventData.description,
      eventDate: moment(updateEventData.eventDate).format('YYYY-MM-DDTHH:MM:SS'),
      eventLocation: updateEventData.eventLocation
    });
  }

  clearFormData() {
    this.eventForm.reset();
    this.eventFile = undefined;
    this.isNewEvent = true;
    this.eventUpdatePhoto = '';
    this.eventUpdateId = undefined;
  }

  submitEventCall() {
    if (!this.validateService.validateEvent(this.eventForm, !this.isNewEvent)) {
      this.flashMessage.show(
        'Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000}
      );
      return false;
    }

    const formData = new FormData();
    formData.append('name', this.eventForm.get('name').value);
    formData.append('description', this.eventForm.get('description').value);
    formData.append('eventDate', this.eventForm.get('eventDate').value);
    formData.append('eventLocation', this.eventForm.get('eventLocation').value);
    if (this.eventFile) {
      formData.append('eventImage', this.eventFile);
    }
    if (this.isNewEvent) {
      this.eventService.createEvent(formData).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitEventService.emitDeleteCreateEvent('event created');
            this.flashMessage.show(
              res.msg,
              {cssClass: 'alert-success', timeout: 3000}
            );
            this.clearFormData();
          } else {
            this.flashMessage.show(
              res.msg,
              {cssClass: 'alert-danger', timeout: 5000}
            );
            console.log(res.error)
          }
        }
      )
    } else {
      this.eventService.updateEvent(this.eventUpdateId, formData).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitEventService.emitDeleteCreateEvent('event updated');
            this.flashMessage.show(
              res.msg,
              {cssClass: 'alert-success', timeout: 3000}
            );
            this.clearFormData();
          } else {
            this.flashMessage.show(
              res.msg,
              {cssClass: 'alert-danger', timeout: 5000}
            );
            console.log(res.error)
          }
        }
      )
    }

  }
}

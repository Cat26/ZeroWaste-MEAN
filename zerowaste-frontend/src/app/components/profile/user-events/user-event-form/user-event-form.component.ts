import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../../services/events/events.service";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../../../services/validate/validate.service";

@Component({
  selector: 'app-user-event-form',
  templateUrl: './user-event-form.component.html',
  styleUrls: ['./user-event-form.component.css']
})
export class UserEventFormComponent implements OnInit {
  eventForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    eventImage: new  FormControl(['']),
    eventDate: new FormControl(''),
    eventLocation: new FormControl('')
  });

  eventFile = undefined;

  constructor(
    private eventService: EventsService,
    private formBuilder: FormBuilder,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {}

  onFileSelect(event) {
    if(event.target.files.length > 0) {
      this.eventFile = event.target.files[0];
    }
  }
  //
  // onChangeEventProperty(event) {
  //   if(event.target.value) {
  //     const value = event.target.value;
  //     this.eventForm.get(event.target.name).setValue(value);
  //   }
  // }

  createEventCall() {
    if(!this.validateService.validateEvent(this.eventForm)){
      this.flashMessage.show(
        'Please fill in all fields',
        {cssClass: 'alert-danger', timeout: 3000}
      );
      return false;
    }
    const formData = new FormData();
    formData.append('name', this.eventForm.get('name').value);
    formData.append('description', this.eventForm.get('description').value);
    formData.append('eventImage', this.eventFile);
    formData.append('eventDate', this.eventForm.get('eventDate').value);
    formData.append('eventLocation', this.eventForm.get('eventLocation').value);
    this.eventService.createEvent(formData).subscribe(
      (res: any) => { if (res.success) {
        this.flashMessage.show(
          res.msg,
          {cssClass: 'alert-success', timeout: 3000}
        );
        this.eventForm.reset();
      }
      else {
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

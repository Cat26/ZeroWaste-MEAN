import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../../services/events/events.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-user-event-form',
  templateUrl: './user-event-form.component.html',
  styleUrls: ['./user-event-form.component.css']
})
export class UserEventFormComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private eventService: EventsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: '',
      description: '',
      eventImage: [''],
      eventDate: '',
      eventLocation: ''
    });
  }

  onFileSelect(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.eventForm.get('eventImage').setValue(file);
    }
  }

  onChangeEventProperty(event) {
    if(event.target.value) {
      const value = event.target.value;
      this.eventForm.get(event.target.name).setValue(value);
    }
  }

  createEventCall() {
    const formData = new FormData();
    formData.append('name', this.eventForm.get('name').value);
    formData.append('description', this.eventForm.get('description').value);
    formData.append('eventImage', this.eventForm.get('eventImage').value);
    formData.append('eventDate', this.eventForm.get('eventDate').value);
    formData.append('eventLocation', this.eventForm.get('eventLocation').value);
    console.log(formData)
    this.eventService.createEvent(formData).subscribe(
      (res) => console.log(res),
      error => console.log(error)
    )
  }



}

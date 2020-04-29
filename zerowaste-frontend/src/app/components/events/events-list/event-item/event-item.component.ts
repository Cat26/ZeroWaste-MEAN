import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../../../services/auth/auth.service';
import { EventsService } from "../../../../services/events/events.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { EmitEventService } from "../../../../services/emitter/emit-event.service";

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  loggedInUserId: string;
  isInitCall = true;
  @Input() eventItem: {
    name: string,
    description: string,
    eventImage: string,
    eventDate: string,
    likesUserList: string[],
    dislikesUserList: string[],
    participants: string[],
    owner: { username: string },
    _id: string
  };

  constructor(
    public authService: AuthService,
    private eventService: EventsService,
    private flashMessage: FlashMessagesService,
    private emitEventService: EmitEventService
  ) {
  }

  ngOnInit(): void {
  }

  getLoggedUserId() {
    this.authService.loadUser();
    let user = JSON.parse(this.authService.user);
    this.loggedInUserId = this.authService.loggedIn() ? user.id : null;
  }

  checkUserIdInParticipantsList() {
    this.getLoggedUserId();
    return this.eventItem.participants.includes(this.loggedInUserId);
  }

  signInToEvent() {
    let participantsList = [this.loggedInUserId].concat(this.eventItem.participants);
    console.log(participantsList)
    this.eventService.updateEvent(this.eventItem._id, {"participants": participantsList}).subscribe(
      (res: any) => {
        if (res.success) {
          this.flashMessage.show(
            res.msg,
            {cssClass: 'alert-success', timeout: 3000}
          );
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

  signOutFromEvent() {

  }

  formatDate(date) {
    let formatedDate = moment(date).format('LLLL');
    return formatedDate;
  }

}

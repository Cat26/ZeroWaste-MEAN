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

  checkUserIdInList(usersIdList) {
    this.getLoggedUserId();
    return usersIdList.includes(this.loggedInUserId);
  }

  signInToEvent() {
    let participantsList = [this.loggedInUserId].concat(this.eventItem.participants);
    this.eventService.updateEvent(this.eventItem._id, {"participants": participantsList}).subscribe(
      (res: any) => {
        if (res.success) {
          this.emitEventService.emitUpdateEvent("event updated");
          this.flashMessage.show(
            `You signed in to ${this.eventItem.name} (${this.eventItem.eventDate})`,
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
    let userIdListIndex = this.eventItem.participants.indexOf(this.loggedInUserId);
    let participantsList = [...this.eventItem.participants];
    participantsList.splice(userIdListIndex, 1);
    this.eventService.updateEvent(this.eventItem._id, {"participants": participantsList}).subscribe(
      (res: any) => {
        if (res.success) {
          this.emitEventService.emitUpdateEvent("event updated");
          this.flashMessage.show(
            `You signed out from ${this.eventItem.name} (${this.formatDate(this.eventItem.eventDate)})`,
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

  likeEvent() {
    if(!this.checkUserIdInList(this.eventItem.dislikesUserList)) {
      let likesList = [this.loggedInUserId].concat(this.eventItem.likesUserList);
      this.eventService.updateEvent(this.eventItem._id, {"likesUserList": likesList}).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitEventService.emitUpdateEvent("event updated");
            this.flashMessage.show(
              `You liked ${this.eventItem.name} (${this.eventItem.eventDate})`,
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
  }

  resetLikeEvent() {
    let userIdListIndex = this.eventItem.likesUserList.indexOf(this.loggedInUserId);
    let likesList = [...this.eventItem.likesUserList];
    likesList.splice(userIdListIndex, 1);
    this.eventService.updateEvent(this.eventItem._id, {"likesUserList": likesList}).subscribe(
      (res: any) => {
        if (res.success) {
          this.emitEventService.emitUpdateEvent("event updated");
          this.flashMessage.show(
            `You reset your like in ${this.eventItem.name} (${this.formatDate(this.eventItem.eventDate)})`,
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

  dislikeEvent() {
    if(!this.checkUserIdInList(this.eventItem.likesUserList)) {
      let dislikesList = [this.loggedInUserId].concat(this.eventItem.dislikesUserList);
      this.eventService.updateEvent(this.eventItem._id, {"dislikesUserList": dislikesList}).subscribe(
        (res: any) => {
          if (res.success) {
            this.emitEventService.emitUpdateEvent("event updated");
            this.flashMessage.show(
              `You disliked ${this.eventItem.name} (${this.eventItem.eventDate})`,
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
  }

  resetDislikeEvent() {
    let userIdListIndex = this.eventItem.dislikesUserList.indexOf(this.loggedInUserId);
    let dislikesList = [...this.eventItem.dislikesUserList];
    dislikesList.splice(userIdListIndex, 1);
    this.eventService.updateEvent(this.eventItem._id, {"dislikesUserList": dislikesList}).subscribe(
      (res: any) => {
        if (res.success) {
          this.emitEventService.emitUpdateEvent("event updated");
          this.flashMessage.show(
            `You reset your dislike in ${this.eventItem.name} (${this.formatDate(this.eventItem.eventDate)})`,
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

  formatDate(date) {
    let formatedDate = moment(date).format('LLLL');
    return formatedDate;
  }

}

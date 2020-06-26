import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { EmitEventService } from "../../services/emitter/emit-event.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    email: '',
    name: '',
    username: ''
  };

  userEvents = [];
  userShops = [];

  selectedOption = "events";

  profileDisplayOptions = [
    {
      id: 1,
      optionValue: "events",
      optionName: "Events",
      optionChecked: true
    },
    {
      id: 2,
      optionValue: "shops",
      optionName: "Shops",
      optionChecked: false
    },
    {
      id: 3,
      optionValue: "personal-goals",
      optionName: "Personal Goals",
      optionChecked: false
    },

  ];


  constructor(
    private authService: AuthService,
    private emitEventService: EmitEventService
  ) {
  }

  ngOnInit() {
    this.emitEventService.deleteCreateEventListener().subscribe(msg =>{
      this.getProfileData();
    });
  }

  onOptionChange(option) {
    this.selectedOption = option.optionValue;
  }

  getProfileData() {
    this.authService.getProfile().subscribe((profile: any) => {
        this.user = profile.user;
        this.userEvents = profile.events;
        this.userShops = profile.shops;
      },
      error => {
        console.log(error);
        return false;
      });
  }
}

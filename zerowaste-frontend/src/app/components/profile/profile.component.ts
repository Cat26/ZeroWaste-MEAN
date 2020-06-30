import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { EmitEventService } from "../../services/emitter/emit-event.service";
import { EmitShopService } from "../../services/emitter/emit-shop.service";

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
    // {
    //   id: 3,
    //   optionValue: "personal-goals",
    //   optionName: "Personal Goals",
    //   optionChecked: false
    // },

  ];


  constructor(
    private authService: AuthService,
    private emitEventService: EmitEventService,
    private emitShopService: EmitShopService
  ) {
  }

  ngOnInit() {
    this.emitEventService.deleteCreateEventListener().subscribe(msg =>{
      this.getProfileData();
    });
    this.emitShopService.deleteCreateEventListener().subscribe(msg =>{
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
        console.log(this.userShops)
      },
      error => {
        console.log(error);
        return false;
      });
  }
}

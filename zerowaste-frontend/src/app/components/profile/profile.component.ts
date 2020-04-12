import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user
    },
      error => {
        console.log(error);
        return false;
      });
  }

  onOptionChange(option) {
    console.log('inside')
    this.selectedOption = option.optionValue;
  }
}

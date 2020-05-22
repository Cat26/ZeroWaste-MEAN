import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsDown, faThumbsUp, faUserFriends, faArrowDown, faArrowUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ValidateService } from "./services/validate/validate.service";
import { AuthService } from "./services/auth/auth.service";
import { EmitEventService } from "./services/emitter/emit-event.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { EventsListComponent } from './components/events/events-list/events-list.component';
import { EventItemComponent } from './components/events/events-list/event-item/event-item.component';
import { EventsService } from "./services/events/events.service";
import { UserEventsComponent } from './components/profile/user-events/user-events.component';
import { UserEventsListComponent } from './components/profile/user-events/user-events-list/user-events-list.component';
import { UserEventFormComponent } from './components/profile/user-events/user-event-form/user-event-form.component';
import { UserEventItemComponent } from './components/profile/user-events/user-events-list/user-event-item/user-event-item.component';
import { HomeListComponent } from './components/home/home-list/home-list.component';
import { HomeItemComponent } from './components/home/home-list/home-item/home-item.component';
import { EventsManagerComponent } from './components/events/events-manager/events-manager.component';
import { UserCalendarComponent } from './components/profile/user-calendar/user-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EventsComponent,
    ProfileComponent,
    EventsListComponent,
    EventItemComponent,
    UserEventsComponent,
    UserEventsListComponent,
    UserEventFormComponent,
    UserEventItemComponent,
    HomeListComponent,
    HomeItemComponent,
    EventsManagerComponent,
    UserCalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    ValidateService,
    AuthService,
    EventsService,
    EmitEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faThumbsDown, faThumbsUp, faUserFriends, faArrowDown, faArrowUp, faAngleDown);
  }
}

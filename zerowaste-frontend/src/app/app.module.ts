import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
  faUserFriends,
  faArrowDown,
  faArrowUp,
  faAngleDown,
  faAngleUp,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { ShopsComponent } from "./components/shops/shops.component";
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { GoogleMapsModule } from '@angular/google-maps';

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
import { MatDialogModule } from "@angular/material/dialog";
import { CalendarItemModalComponent } from './components/profile/user-calendar/calendar-item-modal/calendar-item-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import {UserShopsComponent} from "./components/profile/user-shops/user-shops.component";
import {UserShopsListComponent} from "./components/profile/user-shops/user-shops-list/user-shops-list.component";
import {UserShopsItemComponent} from "./components/profile/user-shops/user-shops-list/user-shops-item/user-shops-item.component";
import {UserShopFormComponent} from "./components/profile/user-shops/user-shop-form/user-shop-form.component";
import {ShopsService} from "./services/shops/shops.service";
import { ShopsListComponent } from './components/shops/shops-list/shops-list.component';
import { ShopsItemComponent } from './components/shops/shops-list/shops-item/shops-item.component';
import { AddressComponent } from './components/address/address.component';
import { AddressItemComponent } from './components/address/address-item/address-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EventsComponent,
    ShopsComponent,
    ProfileComponent,
    EventsListComponent,
    EventItemComponent,
    UserEventsComponent,
    UserEventsListComponent,
    UserEventFormComponent,
    UserEventItemComponent,
    UserShopsComponent,
    UserShopsListComponent,
    UserShopsItemComponent,
    UserShopFormComponent,
    HomeListComponent,
    HomeItemComponent,
    EventsManagerComponent,
    UserCalendarComponent,
    CalendarItemModalComponent,
    EventsManagerComponent,
    ShopsListComponent,
    ShopsItemComponent,
    AddressComponent,
    AddressItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    GoogleMapsModule
  ],
  providers: [
    ValidateService,
    AuthService,
    EventsService,
    ShopsService,
    EmitEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faThumbsDown, faThumbsUp, faUserFriends, faArrowDown, faArrowUp, faAngleDown, faAngleUp, faInfoCircle);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";

import { ValidateService } from "./services/validate/validate.service";
import { AuthService } from "./services/auth/auth.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { EventsListComponent } from './components/events/events-list/events-list.component';
import { EventItemComponent } from './components/events/events-list/event-item/event-item.component';
import { EventsService } from "./services/events/events.service";

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
    EventItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

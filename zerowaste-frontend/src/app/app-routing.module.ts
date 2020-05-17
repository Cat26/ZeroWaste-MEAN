import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {EventsComponent} from "./components/events/events.component";
import {ProfileComponent} from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import {ShopsComponent} from "./components/shops/shops.component";


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'events', component: EventsComponent},
  {path:'shops', component: ShopsComponent},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventResolver,
  EventsListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  LocationValidator,
  DurationPipe,
  VoterService,
} from "./events/index";
import { EventsAppComponent } from "./events-app.component";
import { NavBarComponent } from "./nav/navbar.component";
import {
  JQ_TOKEN,
  TOASTR_TOKEN,
  Toastr,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
} from "./common/index";
import { appRoutes } from "./routes";
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";

let toastr: Toastr = window["toastr"];
let jQuery = window["$"];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavBarComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    UpvoteComponent,
    ModalTriggerDirective,
    LocationValidator,
    DurationPipe,
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventResolver,
    EventsListResolver,
    VoterService,
    AuthService,
    { provide: "canDeactivateCreateEvent", useValue: checkDirtyState },
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm(
      "You have not saved this event. Do you really want to cancel?"
    );
  }
  return true;
}

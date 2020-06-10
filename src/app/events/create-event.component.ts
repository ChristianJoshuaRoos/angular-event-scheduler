import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "../events/shared/event.service";
import { TOASTR_TOKEN, Toastr } from "../common";

@Component({
  templateUrl: "./create-event.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateEventComponent {
  newEvent;
  isDirty: boolean = true;

  constructor(
    private router: Router,
    private eventService: EventService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(["/events"]);
      this.toastr.success("Event Created Successfully");
    });
  }

  cancel() {
    this.router.navigate(["/events"]);
  }
}

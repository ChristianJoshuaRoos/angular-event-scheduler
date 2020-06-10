import { Component } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { EventService, ISession, IEvent } from "../events/index";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .nav.navbar-nav {
        font: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 900px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        color: #f97924;
      }
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class NavBarComponent {
  searchTerm: string = "";
  foundSessions: ISession[];
  events: IEvent[];

  constructor(private auth: AuthService, private eventService: EventService) {}

  getEvents() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      console.log(this.events);
    });
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
      this.foundSessions = sessions;
    });
  }
}

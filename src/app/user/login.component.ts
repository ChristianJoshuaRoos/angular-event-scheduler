import { Component, Inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { TOASTR_TOKEN, Toastr } from "../common/toastr.service";

@Component({
  templateUrl: "./login.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  userName;
  password;
  mouseoverLogin;
  loginInvalid = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  login(formValues) {
    this.authService
      .loginUser(formValues.userName, formValues.password)
      .subscribe((response) => {
        if (!response) {
          this.loginInvalid = true;
        } else {
          this.toastr.success("Login Successful");
          this.router.navigate(["events"]);
        }
      });
  }

  cancel() {
    this.router.navigate(["events"]);
  }
}

import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../../sdk/services/auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isCollapsed = false;
  username;

  ngOnInit(): void {
    // const token = this.authService.getdecodedAccessTokenId();
    // console.log("token", token);
    // this.username = token.email;
  }
  logout() {
    this.authService.logout();
  }
}

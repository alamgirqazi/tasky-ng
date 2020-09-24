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
  display_name;

  ngOnInit(): void {
    const token = this.authService.getdecodedAccessTokenId();
    console.log("token", token);
    this.display_name = token.display_name || token.username;
  }

  logout() {
    this.authService.logout();
  }
}

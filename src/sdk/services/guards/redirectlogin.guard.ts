import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RedirectLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.getSimpleAccessTokenId()) {
      const { role } = this.authService.getdecodedAccessTokenId();
      console.log("rike", role);
      if (role === "Admin") {
        this.router.navigateByUrl("/admin/images");
      } else if (role === "User") {
        this.router.navigateByUrl("/home/images");
      } else {
        this.authService.logout();
      }
    } else {
      return true;
    }
  }
}

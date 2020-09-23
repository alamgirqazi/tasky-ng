import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class IsUserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    const { role } = this.authService.getdecodedAccessTokenId();
    console.log("role -> ", role);
    if (role === "User") {
      return true;
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}

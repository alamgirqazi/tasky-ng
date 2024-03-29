import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class IsLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (!this.authService.getSimpleAccessTokenId()) {
      this.router.navigateByUrl("/login");
    } else {
      return true;
    }
  }
}

import * as decode from "jwt-decode";

import { HttpClient, HttpParams } from "@angular/common/http";

import { CoreConfig } from "../core.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  public getSimpleAccessTokenId() {
    const token = localStorage.getItem("t-token");
    return token;
  }

  public getdecodedAccessTokenId() {
    try {
      const token = localStorage.getItem("t-token");

      return decode(token).data;
    } catch (ex) {
      console.log("ex", ex);
      this.logout();
    }
  }

  public logout() {
    this.clearToken();
    this.router.navigateByUrl("/login");
  }

  public saveToken(token) {
    localStorage.setItem("t-token", token);
  }
  public clearToken() {
    localStorage.removeItem("t-token");
  }
}

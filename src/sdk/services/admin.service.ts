import { HttpClient, HttpParams } from "@angular/common/http";

import { CoreConfig } from "../core.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    const url = CoreConfig.getPath() + `/users`;
    return this.http.get(url);
  }
}

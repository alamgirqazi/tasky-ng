import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { CoreConfig } from "../core.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public uploadImages(files: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const item of files) {
      formData.append("photos", item);
    }
    const { _id } = this.authService.getdecodedAccessTokenId();
    const url = CoreConfig.getPath() + `/images/addImage/${_id}`;

    return this.http.post(url, formData);
  }
  public getUserImages(): Observable<any> {
    const { _id } = this.authService.getdecodedAccessTokenId();
    const url = CoreConfig.getPath() + `/images/${_id}`;

    return this.http.get(url);
  }
}

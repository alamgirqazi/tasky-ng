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

    return this.http.post(url, formData, {
      headers: new HttpHeaders().set(
        "Authorization",
        this.authService.getSimpleAccessTokenId()
      ),
    });
  }
  public getUserImages(): Observable<any> {
    const { _id } = this.authService.getdecodedAccessTokenId();
    const url = CoreConfig.getPath() + `/images/${_id}`;

    return this.http.get(url, {
      headers: new HttpHeaders().set(
        "Authorization",
        this.authService.getSimpleAccessTokenId()
      ),
    });
  }
  public getUserImagesAdmin(_id): Observable<any> {
    const url = CoreConfig.getPath() + `/images/${_id}`;

    return this.http.get(url, {
      headers: new HttpHeaders().set(
        "Authorization",
        this.authService.getSimpleAccessTokenId()
      ),
    });
  }

  public removeImage(_id): Observable<any> {
    const url = CoreConfig.getPath() + `/images/${_id}`;
    const body = { is_deleted: true };
    return this.http.put(url, body, {
      headers: new HttpHeaders().set(
        "Authorization",
        this.authService.getSimpleAccessTokenId()
      ),
    });
  }
}

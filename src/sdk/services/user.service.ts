import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { CoreConfig } from "../core.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface LoginBody {
  email: string;
  password: string;
}
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public userLogin(body: LoginBody): Observable<any> {
    const url = CoreConfig.getPath() + `/users/login`;

    return this.http.post(url, body);
  }

  public addUser(body): Observable<any> {
    body["username"] = body["username"].trim();
    const url = CoreConfig.getPath() + `/users/signup`;
    return this.http.post(url, body);
  }
  public getUsers(limit = 10, pageStart = 1): Observable<any> {
    const url = CoreConfig.getPath() + `/users`;
    const params = new HttpParams()
      .append("limit", limit.toString())
      .append("pageStart", pageStart.toString());

    return this.http.get(url, { params });
  }
  public getCurrentUser(_id): Observable<any> {
    const url = CoreConfig.getPath() + `/users/${_id}`;
    return this.http.get(url);
  }
  public updateUser(username: string, body: object): Observable<any> {
    const url = CoreConfig.getPath() + `/users/${username}`;

    return this.http.put(url, body);
  }
  public updateUserPassword(_id: string, body: object): Observable<any> {
    const url = CoreConfig.getPath() + `/users/password/${_id}`;

    return this.http.put(url, body);
  }

  addBookToUser(body): Observable<any> {
    const url = CoreConfig.getPath() + `/users-addBook`;
    return this.http.post(url, body);
  }
  getUserBooks(): Observable<any> {
    const token = this.authService.getdecodedAccessTokenId();
    const user_id = token._id;

    const params = new HttpParams().append("user_id", user_id);

    const url = CoreConfig.getPath() + `/users-getBooks`;
    return this.http.get(url, { params });
  }
}

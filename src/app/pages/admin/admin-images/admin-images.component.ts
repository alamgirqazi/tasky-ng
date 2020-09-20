import { Component, OnInit } from "@angular/core";

import { HelperService } from "../../../../sdk/services/helper.service";
import { UserService } from "../../../../sdk/services/user.service";

@Component({
  selector: "app-admin-images",
  templateUrl: "./admin-images.component.html",
  styleUrls: ["./admin-images.component.scss"],
})
export class AdminImagesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private helperService: HelperService
  ) {}
  users = [];

  ngOnInit(): void {
    this.getAll();
  }
  getAll(again = false) {
    // this.loading = true;

    this.userService.getUsers(500, 1).subscribe(
      (response) => {
        console.log("got response", response);
        this.users = response.data.docs;
        // this.total = response.data.total;
        // this.loading = false;
      },
      (error) => {
        console.log("error", error);
        const errorMsg =
          error?.error?.message || "No response. Please check your internet";
        this.helperService.createMessage("error", errorMsg);
      }
    );
  }
}

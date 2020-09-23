import { Component, OnInit } from "@angular/core";
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from "@angular/animations";

import { UserService } from "src/sdk/services/user.service";

@Component({
  selector: "app-home-images",
  templateUrl: "./home-images.component.html",
  styleUrls: ["./home-images.component.scss"],
})
export class HomeImagesComponent implements OnInit {
  constructor(private userService: UserService) {}
  loading = false;
  listView = true;
  search_name;
  statusBooks = "all";
  bookResults = [];
  skeletonItems = [1, 2, 3];
  displaybookResults = [];
  selectedType = "All";
  lastEvent;
  ngOnInit(): void {
    // this.getAll();
  }
  getAll(again = false) {
    // this.loading = true;
    // this.userService.getUserBooks().subscribe(
    //   (response) => {
    //     console.log("response->", response);
    //     this.bookResults = [...response.data];
    //     this.displaybookResults = [...response.data];
    //     // setTimeout(() => {
    //     if (again) {
    //       console.log("lastEvent", this.lastEvent);
    //       this.filterChanged(this.lastEvent || "All");
    //     }
    //     this.loading = false;
    //     // }, 0);
    //   },
    //   (error) => {
    //     console.log("error", error);
    //     this.loading = false;
    //   }
    // );
  }
}

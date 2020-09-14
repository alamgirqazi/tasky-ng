import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-users",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.scss"],
})
export class AdminUsersComponent implements OnInit {
  constructor() {}
  size = 10;
  pageIndex = 1;
  loading = false;
  total = 0;
  listOfData = [];

  ngOnInit(): void {}

  getAll() {}
}

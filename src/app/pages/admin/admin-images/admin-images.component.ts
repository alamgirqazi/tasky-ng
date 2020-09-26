import { Component, OnInit } from "@angular/core";

import { CoreConfig } from "../../../../sdk/core.config";
import { HelperService } from "../../../../sdk/services/helper.service";
import { ImagesService } from "src/sdk/services/images.service";
import { UserService } from "../../../../sdk/services/user.service";

@Component({
  selector: "app-admin-images",
  templateUrl: "./admin-images.component.html",
  styleUrls: ["./admin-images.component.scss"],
})
export class AdminImagesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private imageService: ImagesService,
    private helperService: HelperService
  ) {}
  users = [];
  images = [];
  loading = false;
  skeletonItems = [1, 2, 3];
  isVisible = false;
  okloading = false;
  deleteLoading = false;
  isVisibleGallery = false;
  isVisibleDelete = false;
  deleteObj;
  selectedUserId;
  imageIndex;
  imagesLoading = false;

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
  changedUser(e) {
    console.log("changed user", e);
    this.getUserImages(e);
  }
  getUserImages(_id) {
    this.imagesLoading = true;
    this.imageService.getUserImagesAdmin(_id).subscribe(
      (response) => {
        console.log("getUserImages");
        for (let item of response.data) {
          item.src =
            CoreConfig.getStaticPath() + "/" + item.destination + item.filename;
        }
        this.images = response.data;

        this.imagesLoading = false;
      },
      (error) => {
        console.log("error", error);
        this.imagesLoading = false;
      }
    );
  }
  showGallery(index) {
    this.imageIndex = index;
    this.isVisibleGallery = true;
  }
  cancelGallery() {
    this.isVisibleGallery = false;
  }
}

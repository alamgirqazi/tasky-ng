import { HelperService } from "./../../../../sdk/services/helper.service";
import { ImagesService } from "./../../../../sdk/services/images.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { Component, OnInit } from "@angular/core";

import { UserService } from "src/sdk/services/user.service";
import { CoreConfig } from "../../../../sdk/core.config";

@Component({
  selector: "app-home-images",
  templateUrl: "./home-images.component.html",
  styleUrls: ["./home-images.component.scss"],
})
export class HomeImagesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private imageService: ImagesService,
    private message: NzMessageService,
    private helperService: HelperService
  ) {}
  loading = false;
  file;
  tempImage = "assets/image-upload.jpg";
  imageIndex = 0;
  items = [];
  images = [];
  skeletonItems = [1, 2, 3];
  isVisible = false;
  okloading = false;
  deleteLoading = false;
  isVisibleGallery = false;
  isVisibleDelete = false;
  deleteObj;

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.loading = true;
    this.imageService.getUserImages().subscribe(
      (response) => {
        for (let item of response.data) {
          item.src =
            CoreConfig.getStaticPath() + "/" + item.destination + item.filename;
        }
        this.images = response.data;

        this.loading = false;
      },
      (error) => {
        console.log("error", error);
        this.loading = false;
      }
    );
  }
  onFileChangedMultiple(e) {
    const files = e.target.files;
    // get items length and set index according

    const items_length = this.items.length;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.readAsDataURL(files[i]);
      if (items_length + (i + 1) > 5 || files.length > 5) {
        this.message.error("You can only upload a maximum of 5 images", {
          nzDuration: 3500,
        });

        return;
      }
      reader.onload = (event) => {
        this.items.push({
          src: (<FileReader>event.target).result,
          file: files[i],
          touched: true,
          display: false,
          extension: files[i].name.split(".").pop(),
          index: items_length + 1 + i,
        });
      };
    }
    setTimeout(() => {
      console.log("time out", this.items);
      if (this.items.length) {
        console.log("why");
        this.isVisible = true;
      }
    }, 50);

    // this.resetInputMultiple();
  }
  removeImage(index) {
    console.log("r");
    if (this.items.length > 0) {
      console.log("splicing", index);
      this.items.splice(index, 1);

      // delete this.items[index];
    }
  }
  cancelDelete() {
    this.isVisibleDelete = false;
  }
  deleteImage() {
    this.deleteLoading = true;
    const _id = this.deleteObj.imageInfo._id;
    this.imageService.removeImage(_id).subscribe(
      (response) => {
        console.log("response->", response);

        this.images.splice(this.deleteObj.imageIndex, 1);
        this.helperService.createMessage(
          "success",
          "Image removed successfully"
        );
        this.deleteLoading = false;
        this.isVisibleDelete = false;
      },
      (error) => {
        console.log("error", error);
        this.deleteLoading = false;
      }
    );
  }
  cancelGallery() {
    this.isVisibleGallery = false;
  }

  removeModal(obj) {
    this.deleteObj = obj;
    this.isVisibleDelete = true;
  }

  showGallery(index) {
    this.imageIndex = index;
    this.isVisibleGallery = true;
  }
  uploadImages() {
    this.okloading = true;
    const arrayBody = [];
    for (const item of this.items) {
      arrayBody.push(item.file);
    }

    this.imageService.uploadImages(arrayBody).subscribe(
      (response) => {
        this.helperService.createMessage(
          "success",
          "Images uploaded successfully"
        );

        for (let item of response.data) {
          item.src =
            CoreConfig.getStaticPath() + "/" + item.destination + item.filename;
        }
        this.images = response.data;

        this.items = [...[]];

        // this.getCurrentUser();
        this.okloading = false;
        this.isVisible = false;
      },
      (error) => {
        this.okloading = false;

        console.log("error", error);
        if (error.error.code === 422) {
          return;
        }
        const errorMsg =
          error?.error?.message || "No response. Please check your internet";
        this.helperService.createMessage("error", errorMsg);
      }
    );
  }
  onFileChangedOneOfMany(e, item) {
    // this.file = event.target.files[0]
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      item.touched = true;
      item.src = (<FileReader>event.target).result;
      item.file = file;
      item.extension = file.name.split(".").pop();
    };
  }

  cancel() {
    this.isVisible = false;
    this.items = [...[]];
  }

  ok() {
    this.uploadImages();
  }
  uploadFile() {}
}

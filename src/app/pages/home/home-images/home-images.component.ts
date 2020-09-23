import { NzMessageService } from "ng-zorro-antd/message";
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
  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}
  loading = false;
  file;
  items = [];
  isVisible = false;
  okloading = false;

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
      if (this.items.length) {
        this.isVisible = true;
      }
    }, 10);

    // this.resetInputMultiple();
  }
  removeImage(index) {
    if (this.items.length > 0) {
      this.items.splice(index, 1);

      // delete this.items[index];
    }
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
    this.items.length = 0;
  }

  ok() {}
  uploadFile() {}
}

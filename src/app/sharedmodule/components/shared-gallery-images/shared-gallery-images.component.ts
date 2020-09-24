import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "ngx-gallery-9";

@Component({
  selector: "shared-gallery-images",
  templateUrl: "./shared-gallery-images.component.html",
  styleUrls: ["./shared-gallery-images.component.scss"],
})
export class SharedGalleryImagesComponent implements OnInit {
  constructor() {}
  @Input() imagesList;
  @Input() imageIndex;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit() {
    this.galleryOptions = [
      {
        width: "650px",
        height: "500px",
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
        imageArrowsAutoHide: false,
        thumbnailsArrowsAutoHide: true,
        previewZoom: true,
        startIndex: this.imageIndex,
        // thumbnailsRemainingCount: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 20,
        thumbnailsPercent: 5,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];
    this.galleryImages = [];

    if (this.imagesList) {
      this.imagesList.forEach((element) => {
        this.galleryImages.push({
          small: element.src,
          medium: element.src,
          big: element.src,
        });
      });
    }
  }
}

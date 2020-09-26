import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "shared-image-card",
  templateUrl: "./image-card.component.html",
  styleUrls: ["./image-card.component.scss"],
})
export class ImageCardComponent implements OnInit {
  constructor() {}
  @Input() imageInfo;
  @Input() imageIndex;
  @Input() showDelete = true;

  @Output() output = new EventEmitter();
  @Output() outputDelete = new EventEmitter();

  tempImage = "assets/image-upload.jpg";
  loading = false;

  ngOnInit(): void {}

  showGallery() {
    this.output.emit({ imageIndex: this.imageIndex });
  }

  deleteConfirm() {
    console.log("c");
    this.outputDelete.emit({
      imageInfo: this.imageInfo,
      imageIndex: this.imageIndex,
    });
  }
}

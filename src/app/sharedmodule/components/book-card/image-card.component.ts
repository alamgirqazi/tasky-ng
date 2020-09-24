import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "shared-image-card",
  templateUrl: "./image-card.component.html",
  styleUrls: ["./image-card.component.scss"],
})
export class ImageCardComponent implements OnInit {
  constructor() {}
  @Input() imageInfo;

  @Output() output = new EventEmitter();
  tempImage = "assets/image-upload.jpg";
  loading = false;

  ngOnInit(): void {}
}

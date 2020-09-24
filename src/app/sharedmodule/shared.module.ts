import { CommonModule } from "@angular/common";
import { DurationPipe } from "./pipes/duration.pipe";
import { FormsModule } from "@angular/forms";
import { ImageCardComponent } from "./components/book-card/image-card.component";
import { NgModule } from "@angular/core";
import { NgxGalleryModule } from "ngx-gallery-9";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzRateModule } from "ng-zorro-antd/rate";
import { NzResultModule } from "ng-zorro-antd/result";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzTimelineModule } from "ng-zorro-antd/timeline";
import { SharedGalleryImagesComponent } from "./components/shared-gallery-images/shared-gallery-images.component";
import { TruncatePipe } from "./pipes/truncate.pipe";

const components = [
  SharedGalleryImagesComponent,
  ImageCardComponent,
  TruncatePipe,
  DurationPipe,
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzSwitchModule,
    NzRateModule,
    NzRadioModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBadgeModule,
    NzButtonModule,
    NzResultModule,
    NzDatePickerModule,
    NzModalModule,
    NgxGalleryModule,
    NzSkeletonModule,
    NzTimelineModule,
    NzIconModule,
    NzSelectModule,
  ],
  exports: [
    NzDropDownModule,
    NzAvatarModule,
    NzModalModule,
    NzRadioModule,
    NzBadgeModule,
    NzSkeletonModule,
    NzResultModule,
    NzSelectModule,
    ...components,
  ],
})
export class SharedModule {}

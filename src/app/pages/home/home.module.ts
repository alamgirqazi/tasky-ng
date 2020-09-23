import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HomeComponent } from "./home.component";
import { HomeImagesComponent } from "./home-images/home-images.component";
import { HomeProfileComponent } from "./home-profile/home-profile.component";
import { HomeRoutingModule } from "./home-routing.module";
import { IconsProviderModule } from "./../../icons-provider.module";
import { NgModule } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzTabsModule } from "ng-zorro-antd";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/sharedmodule/shared.module";

@NgModule({
  declarations: [HomeComponent, HomeImagesComponent, HomeProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzSwitchModule,
    FormsModule,
    DragDropModule,
    NzMenuModule,
    NzGridModule,
    NzInputModule,
    IconsProviderModule,
    NzPageHeaderModule,
    NzTableModule,
    NzTabsModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}

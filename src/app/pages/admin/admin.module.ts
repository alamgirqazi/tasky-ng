import {
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzDropDownModule,
  NzEmptyModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalModule,
  NzPageHeaderModule,
  NzPopconfirmModule,
  NzResultModule,
  NzSelectModule,
  NzSpinModule,
  NzSwitchModule,
  NzTableModule,
  NzTabsModule,
} from "ng-zorro-antd";

import { AdminComponent } from "./admin.component";
import { AdminImagesComponent } from "./admin-images/admin-images.component";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/sharedmodule/shared.module";

@NgModule({
  declarations: [
    AdminComponent,
    AdminImagesComponent,
    AdminUsersComponent,
    AdminProfileComponent,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    SharedModule,
    NzButtonModule,
    NzSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzMenuModule,
    NzDropDownModule,
    NzGridModule,
    NzInputModule,
    NzSpinModule,
    NzPageHeaderModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
    NzAvatarModule,
    NzCardModule,
    NzEmptyModule,
    NzResultModule,
    NzPopconfirmModule,
    NzTabsModule,
    NzDropDownModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}

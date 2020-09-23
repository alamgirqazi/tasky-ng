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
  NzSwitchModule,
  NzTableModule,
} from "ng-zorro-antd";

import { AdminComponent } from "./admin.component";
import { AdminImagesComponent } from "./admin-images/admin-images.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AdminComponent, AdminImagesComponent, AdminUsersComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzMenuModule,
    NzDropDownModule,
    NzGridModule,
    NzInputModule,
    NzPageHeaderModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
    NzAvatarModule,
    NzCardModule,
    NzEmptyModule,
    NzResultModule,
    NzPopconfirmModule,
    NzDropDownModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}

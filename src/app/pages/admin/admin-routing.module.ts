import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { AdminImagesComponent } from "./admin-images/admin-images.component";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "users", component: AdminUsersComponent },
      { path: "images", component: AdminImagesComponent },
      { path: "profile", component: AdminProfileComponent },
      { path: "**", redirectTo: "images" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

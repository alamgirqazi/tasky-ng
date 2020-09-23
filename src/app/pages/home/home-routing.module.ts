import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home.component";
import { HomeImagesComponent } from "./home-images/home-images.component";
import { HomeProfileComponent } from "./home-profile/home-profile.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "images", component: HomeImagesComponent },
      { path: "profile", component: HomeProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

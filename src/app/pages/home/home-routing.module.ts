import { RouterModule, Routes } from "@angular/router";

import { HomeAnalyticsComponent } from "./home-analytics/home-analytics.component";
import { HomeBooksComponent } from "./home-books/home-books.component";
import { HomeComponent } from "./home.component";
import { HomeSearchComponent } from "./home-search/home-search.component";
import { HomeSettingsComponent } from "./home-settings/home-settings.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "books", component: HomeBooksComponent },
      { path: "search", component: HomeSearchComponent },
      { path: "analytics", component: HomeAnalyticsComponent },
      { path: "settings", component: HomeSettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import { CommonModule } from "@angular/common";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";
import { HomeAnalyticsComponent } from "./home-analytics/home-analytics.component";
import { HomeBooksComponent } from "./home-books/home-books.component";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeSearchComponent } from "./home-search/home-search.component";
import { HomeSettingsComponent } from "./home-settings/home-settings.component";
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
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/sharedmodule/shared.module";

@NgModule({
  declarations: [
    HomeComponent,
    HomeSearchComponent,
    // HomeBoardComponent,
    HomeAnalyticsComponent,
    HomeSettingsComponent,
    HomeBooksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
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
    HomeRoutingModule,
  ],
})
export class HomeModule {}

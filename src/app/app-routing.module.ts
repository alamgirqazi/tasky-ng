import { RouterModule, Routes } from "@angular/router";

import { IsAdminGuard } from "./../sdk/services/guards/isadmin.guard";
import { IsLoginGuard } from "src/sdk/services/guards/islogin.guard";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { RedirectLoginGuard } from "src/sdk/services/guards/redirectlogin.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  // { path: "", component: LandingPageComponent },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [RedirectLoginGuard],
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
    canActivate: [IsLoginGuard],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./pages/admin/admin.module").then((m) => m.AdminModule),
    canActivate: [IsLoginGuard, IsAdminGuard],
  },

  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

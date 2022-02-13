import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { NavBarComponent } from './nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoAuthGuardService } from 'src/app/guards/no-auth-guard.service';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';

const routes: Routes = [
  {
    path: '',

    component: NavBarComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [NoAuthGuardService],
      },
      {
        path: 'pecipe-create',
        component: RecipeCreateComponent,
        canActivate: [NoAuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavBarRoutingModule {}

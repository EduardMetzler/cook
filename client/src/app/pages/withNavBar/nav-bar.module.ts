import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarRoutingModule } from './nav-bar-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { NavBarComponent } from './nav-bar.component';

import { MaterialModule } from '../../shared/material.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipeComponent } from './recipe/recipe.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    RecipeCreateComponent,
    MyRecipesComponent,
    RecipeComponent,
  ],

  imports: [
    CommonModule,
    MaterialModule,
    NavBarRoutingModule,
    FlexLayoutModule,
  ],
})
export class NavBarModule {}

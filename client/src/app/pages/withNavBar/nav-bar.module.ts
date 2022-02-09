import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarRoutingModule } from './nav-bar-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { NavBarComponent } from './nav-bar.component';

import { MaterialModule } from '../../shared/material.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [NavBarComponent, HomeComponent],

  imports: [
    CommonModule,
    MaterialModule,
    NavBarRoutingModule,
    FlexLayoutModule,
  ],
})
export class NavBarModule {}

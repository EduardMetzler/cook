import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login.component';

import { MaterialModule } from '../../../shared/material.module';

@NgModule({
  declarations: [LoginComponent],

  imports: [CommonModule, MaterialModule, LoginRoutingModule, FlexLayoutModule],
})
export class LoginModule {}

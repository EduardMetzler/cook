import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { RegisterComponent } from './register.component';

import { MaterialModule } from '../../../shared/material.module';

@NgModule({
  declarations: [RegisterComponent],

  imports: [
    CommonModule,
    MaterialModule,
    RegisterRoutingModule,
    FlexLayoutModule,
  ],
})
export class RegisterModule {}

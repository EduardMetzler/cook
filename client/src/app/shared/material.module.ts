import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

const MaterialComponents = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  FormsModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatRadioModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTableModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MaterialComponents],
})
export class MaterialModule {}

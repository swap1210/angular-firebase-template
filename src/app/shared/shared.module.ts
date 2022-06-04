import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';

const moduleList = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  AppRoutingModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  BrowserModule,
  MatInputModule,
  HttpClientModule,
  // MatMenuModule,
  // MatDatepickerModule,
  // MatMomentDateModule,
  // MatSlideToggleModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  // MatSnackBarModule,
  // MatDialogModule,
  // MatButtonToggleModule,
  // MatBottomSheetModule,
];
@NgModule({
  declarations: [],
  imports: moduleList,
  exports: moduleList,
})
export class SharedModule {}

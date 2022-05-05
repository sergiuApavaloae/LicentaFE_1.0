import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule, 
  MatDialog,
  MatDialogModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArmodeComponent } from './armode/armode.component';
import { MapComponent } from './map/map.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogReadOnlyComponent } from './dialog-read-only/dialog-read-only.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArmodeComponent,
    MapComponent,
    DialogComponent,
    DialogReadOnlyComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatDialogModule,
  MatInputModule,
  FormsModule      
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [
    DialogComponent,
    DialogReadOnlyComponent
  ],
})
export class AppModule { }

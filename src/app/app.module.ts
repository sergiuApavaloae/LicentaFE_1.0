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
  MatDialogModule,
  MatTable,
  MatTableModule,
  MatSelect,
  MatSelectModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArmodeComponent } from './armode/armode.component';
import { MapComponent } from './map/map.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogReadOnlyComponent } from './dialog-read-only/dialog-read-only.component';
import { JwtInterceptor } from './jwt.interceptor';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { PinTableComponent } from './pin-table/pin-table.component';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArmodeComponent,
    MapComponent,
    DialogComponent,
    DialogReadOnlyComponent,
    FeedbackComponent,
    UsersTableComponent,
    PinTableComponent,
    UserInfoComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatInputModule,
  MatSelectModule,
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
  MatTableModule,
  FormsModule      
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [
    DialogComponent,
    DialogReadOnlyComponent
  ],
})
export class AppModule { }

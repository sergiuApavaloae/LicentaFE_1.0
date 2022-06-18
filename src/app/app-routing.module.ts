import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ArmodeComponent } from './armode/armode.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { PinTableComponent } from './pin-table/pin-table.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsersTableComponent } from './users-table/users-table.component';

const routes: Routes = [
  {path:'feedback/:pinId',component:FeedbackComponent},
  {path: 'home', component: HomeComponent},
  {path: 'Armode', component:ArmodeComponent},
  {path:'map', component:MapComponent},
  {path:'tabel',component:UsersTableComponent} ,
  {path:'myAccount',component:UserInfoComponent},
  {path:'pins',component:PinTableComponent} ,                
  {path: '', redirectTo:'/home', pathMatch: 'full'},                   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

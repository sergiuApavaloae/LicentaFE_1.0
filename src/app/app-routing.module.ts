import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ArmodeComponent } from './armode/armode.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'Armode', component:ArmodeComponent},
  {path:'map', component:MapComponent},                  
  {path: '', redirectTo:'/home', pathMatch: 'full'},                   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

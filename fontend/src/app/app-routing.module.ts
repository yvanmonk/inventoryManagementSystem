import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/***********************SERVICES**********************************/
import { AuthGuardService } from "./auth-guard.service";
import { AuthenticationService } from "./authentication.service";

import { ProduitsComponent } from './produits/produits.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'home', component: HomeComponent},  
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path:'produits', component: ProduitsComponent, canActivate: [AuthGuardService] },
  {path:'categories', component: CategoriesComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

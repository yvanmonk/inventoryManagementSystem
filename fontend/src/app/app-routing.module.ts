import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/***********************SERVICES**********************************/
import { AuthGuardService } from "./services/auth-guard.service";
import { AuthenticationService } from "./services/authentication.service";

import { DisplayProduitComponent } from './produits/display-produit.component';
import { DisplayAccountComponent } from './register/display-account.component';
// import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
// import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { InOutComponent } from './in-out/in-out.component';
import { DisplayTransactionComponent } from './in-out/display-transaction/display-transaction.component';
import { InventoryComponent } from './inventory/inventory.component';
import { StaffComponent } from './staff/staff.component';


const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path:'login', component: LoginComponent},  
  {path:'home', component: HomeComponent, canActivate: [AuthGuardService]}, 
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuardService]}, 
  {path:'display_staff', component: StaffComponent, canActivate: [AuthGuardService]},
  // {path:'register', component: RegisterComponent, canActivate: [AuthGuardService]},
  {path:'liste_produits', component: DisplayProduitComponent, canActivate: [AuthGuardService]},
  {path:'liste_categories', component: CategoriesComponent, canActivate: [AuthGuardService]}, 
  {path:'display_account', component: DisplayAccountComponent, canActivate: [AuthGuardService]},
  {path:'display_transaction', component: DisplayTransactionComponent, canActivate: [AuthGuardService]},
  {path:'add_transaction', component: InOutComponent, canActivate: [AuthGuardService]},
  {path:'inventory', component: InventoryComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/***********************MODULES**********************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

/***********************SERVICES**********************************/
import { AuthGuardService } from "./auth-guard.service";
import { AuthenticationService } from "./authentication.service";

/***********************COMPONENTS**********************************/
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'home', component: HomeComponent},  
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path:'produits', component: ProduitsComponent, canActivate: [AuthGuardService] },
  {path:'categories', component: CategoriesComponent, canActivate: [AuthGuardService]},
  {path:'register', component: RegisterComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    CategoriesComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

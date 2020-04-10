/***********************MODULES**********************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { DevExtremeModule } from "devextreme-angular";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule,
         DxSelectBoxModule,
         DxBulletModule,
         DxTextAreaModule,
         DxCheckBoxModule,
         DxNumberBoxModule,
         DxButtonModule,
         DxFormModule,
         DxAutocompleteModule,
         DxTemplateModule } from 'devextreme-angular';
// import DataSource from 'devextreme/data/data_source';

/***********************SERVICES**********************************/

import { AuthenticationService } from "./services/authentication.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { MessageService } from "./services/message.service";
import { HttpErrorHandlerService } from "./services/http-error-handler.service";


/***********************COMPONENTS**********************************/
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { DisplayAccountComponent } from './register/display-account.component';
import { DisplayProduitComponent } from './produits/display-produit.component';
import { CategoriesComponent } from './categories/categories.component';
import { StaffComponent } from './staff/staff.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DisplayTransactionComponent } from './in-out/display-transaction.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path:'login', component: LoginComponent},  
  {path:'home', component: HomeComponent, canActivate: [AuthGuardService]}, 
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path:'display_staff', component: StaffComponent, canActivate: [AuthGuardService]},
  {path:'liste_produits', component: DisplayProduitComponent, canActivate: [AuthGuardService]},
  {path:'liste_categories', component: CategoriesComponent, canActivate: [AuthGuardService]}, 
  {path:'display_account', component: DisplayAccountComponent, canActivate: [AuthGuardService]},
  {path:'display_transaction', component: DisplayTransactionComponent, canActivate: [AuthGuardService]},
  {path:'inventory', component: InventoryComponent, canActivate: [AuthGuardService]}
  // {path: '**', component: PageNotFoundComponent}, 
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    DisplayAccountComponent,
    DisplayProduitComponent,
    CategoriesComponent,
    StaffComponent,
    InventoryComponent,
    DisplayTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    DevExtremeModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxAutocompleteModule,

  ],
    providers: [AuthenticationService , AuthGuardService, 
      MessageService, HttpErrorHandlerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
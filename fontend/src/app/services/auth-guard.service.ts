import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
// import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }
    
  canActivate(){
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/login')
      return false
    }
    return true
  }
}

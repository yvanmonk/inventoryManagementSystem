import { Component, OnInit } from '@angular/core';
import { AuthenticationService , TokenPayload} from "../services/authentication.service";
import { User } from '../../entities/User';
// import { TokenService } from '../services/token.service';
import { Router } from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit{
  
  error = null;
  bad_request = null;
  loading = false;
  
  credentials: TokenPayload = {
    id: 0,
    name: '',
    email: '',
    password: ''
  }
  constructor(private _auth: AuthenticationService, private _router: Router) { 
      if(this._auth.isLoggedIn()){
        this._router.navigateByUrl('/home')
      }
     }

  initLoginForm(){

  }

  ngOnInit(){
        
  }

  login() {
    this.loading = true;
    this._auth.login(this.credentials).subscribe(
    () => {
      this._router.navigateByUrl('/home')
      
    },
    err => {
      this.error = err.error.error
      if(this.error == undefined){
        this.bad_request = true
        this.loading = false;
        console.log(this.bad_request)
        return this.bad_request
      }else{
        this.loading = false;
        return this.error
      }
    });
  }

}


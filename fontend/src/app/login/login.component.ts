import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from "src/app/authentication.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials :  TokenPayload = {
    id: 0,
    name: '',
    email: '',
    password: ''
  }
  data = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })


  constructor(private auth: AuthenticationService, private router: Router, private http: HttpClient) { }

  login(){
    this.auth.login(this.data.get('email').value, this.data.get('password').value).subscribe(
      () => {
        this.router.navigateByUrl('/home')
      },
      err => {
        console.error(err)
      }
    )
  }
}

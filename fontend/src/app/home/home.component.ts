import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthenticationService]
})
export class HomeComponent implements OnInit {

  constructor(private _auth: AuthenticationService) { 
    
  }

  ngOnInit() {
  }
  logout() {
    this._auth.logout();
  }

}

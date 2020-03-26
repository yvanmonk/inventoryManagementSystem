import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserAc } from "src/app/services/authentication.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthenticationService]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

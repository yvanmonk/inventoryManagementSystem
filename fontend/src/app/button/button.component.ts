import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserAc } from "src/app/services/authentication.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  providers: [AuthenticationService]
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

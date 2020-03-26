import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserAc } from "src/app/services/authentication.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [AuthenticationService]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

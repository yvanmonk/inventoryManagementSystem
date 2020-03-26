import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthenticationService]
})
export class ProfileComponent implements OnInit {
  

  constructor(private auth:AuthenticationService) { }

  ngOnInit () {
    // this.auth.profile().subscribe(
    //   user => {
    //     this.details = user
    //     console.log('er')
    //   },
    //   err => {
    //     console.error(err)
    //   }
    // )
  
  }

}

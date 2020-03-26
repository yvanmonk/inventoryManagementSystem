import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserAc } from "src/app/services/authentication.service";
import { AccountService,Employee, State } from '../services/account.service';

@Component({
  selector: 'app-display-account',
  templateUrl: './display-account.component.html',
  styleUrls: ['./display-account.component.css'],
  providers: [AccountService, AuthenticationService]
})

export class DisplayAccountComponent implements OnInit {
  
  user :  UserAc = {
    id: 0,
    name: '',
    first_name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    address: '',
    poste: '',
    role: ''
  }
  dataSource: any;
  error = null;
  updateSuccess = null;
  deletedSuccess = null;
  insertedSuccess = null;
  success = null;
  success_delete = null;
  
  constructor(service: AccountService, private data_account: AuthenticationService) { }
  onRowInserted(e) {
    console.log(e.data)
    this.data_account.create_user(e.data).subscribe(
      insertedResult => {
        this.insertedSuccess = insertedResult.success
        console.log(this.insertedSuccess)
        this.get_user_account()
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
    this.get_user_account()
  }
  onRowUpdated(e) {
    console.log(e.data)
    this.data_account.update_users(e.data).subscribe(
      update => {
        this.updateSuccess = update.success
        console.log(update.success)
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
 
  }
  onRowRemoved(e) {
    console.log(e.data)
    this.data_account.delete_user(e.data.id).subscribe(
      removed => {
        this.deletedSuccess = removed.success
        console.log(this.deletedSuccess)
      },
      error => { 
        this.success_delete = error
        console.log(error)
      }
    );

  }

  ngOnInit() {
    this.get_user_account()
  }
  get_user_account(){
    this.data_account.display_users().subscribe(
      user => {
        this.dataSource = user.user;
        console.log(user.user)
      },
      err => {
        console.error(err)
      })
  }

}

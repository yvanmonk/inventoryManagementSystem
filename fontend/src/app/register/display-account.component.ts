import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService, UserAc } from "src/app/services/authentication.service";
import { AccountService,Employee, State } from '../services/account.service';
import { DxFormComponent } from 'devextreme-angular';
import { DxoFormComponent } from 'devextreme-angular/ui/nested';

@Component({
  selector: 'app-display-account',
  templateUrl: './display-account.component.html',
  styleUrls: ['./display-account.component.css'],
  providers: [AccountService, AuthenticationService]
})

export class DisplayAccountComponent implements OnInit {
  @ViewChild(DxoFormComponent, { static: false }) form:DxoFormComponent
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
  dataSource: any
  error = null
  updateSuccess = null
  deletedSuccess = null
  insertedSuccess = null
  success = null
  success_delete = null
  refreshModes: string[]
  refreshMode: string

  password = ""
  passwordOptions: any = {
    mode: 'password',
    value: this.password
  }
  

  phonePattern: any = /^\+\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{2}\s*-\s*\d{2}\s*-\s*\d{2}$/

  constructor(service: AccountService, private data_account: AuthenticationService) {}
//   form_fieldDataChanged (ev) {
//     console.log(ev)
//     let updatedField = ev.dataField;
//     let newValue = ev.value;
//     // Event handling commands go here
// }
  passwordComparison = () => {
    return this.form.instance.option("formData").password
  }
  checkComparison() {
    return true
  }
  onRowInserted(e) {
  
    console.log(e)
    this.data_account.create_user(e.data).subscribe(
      insertedResult => {
        this.insertedSuccess = insertedResult.success
        console.log(this.insertedSuccess)
        this.get_user_account()
        this.refreshMode = "reshape"
        this.refreshModes = ["full", "reshape", "repaint"]
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

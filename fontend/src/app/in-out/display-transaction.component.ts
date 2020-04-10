import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { AuthenticationService } from "../services/authentication.service";



@Component({
  selector: 'app-display-transaction',
  templateUrl: './display-transaction.component.html',
  styleUrls: ['./display-transaction.component.css'],
  providers: [AuthenticationService, ProduitsService]
})
export class DisplayTransactionComponent implements OnInit {
  
  
  dataSource: any
  staffs: any
  products: any
  error = null
  updateSuccess = null
  deletedSuccess = null
  insertedSuccess = null
  success = null
  success_delete = null
  refreshModes: string[]
  refreshMode: string

  constructor(private _serviceProd: ProduitsService, private _serviceUser: AuthenticationService) { }

  onRowInserted(e) {
    this._serviceProd.updateState_products(e.data).subscribe(
      updateState=>{ console.log(updateState)},
      error=>{console.log(error)}
    )
    this._serviceProd.create_productUsage(e.data).subscribe(
      insertedResult => {
        this.insertedSuccess = insertedResult.success
        console.log(insertedResult)
        this.get_productUser()
        this.get_product()
        this.get_user_account()
        this.refreshMode = "reshape"
        this.refreshModes = ["full", "reshape", "repaint"]
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
  }
  onRowUpdated(e) {

    this._serviceProd.update_productUser(e.data).subscribe(
      update => {
        this.updateSuccess = update.success
        console.log(update)
        console.log(update.success)
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
 
  }
  onRowRemoved(e) {
    this._serviceProd.productUpdate(e.data).subscribe(
      updateState=>{ console.log(updateState)},
      error=>{console.log(error)}
    )
    this._serviceProd.delete_productUser(e.data.id).subscribe(
      removed => {
        this.deletedSuccess = removed.success
        console.log(this.deletedSuccess)
        console.log(removed)
      },
      error => { 
        this.success_delete = error
        console.log(error)
      }
    );
  }

  ngOnInit() {
    this.get_productUser()
    this.get_user_account()
    this.get_product()
  }
  get_user_account(){
    this._serviceUser.display_users2().subscribe(
      staff => {
        this.staffs = staff.user
      },
      err => {
        console.error(err)
      })
  }
  get_product(){
    this._serviceProd. display_products().subscribe(
      product => {
        this.products = product
      },
      err => {
        console.error(err)
      })
  }

  get_productUser(){
    this._serviceProd.display_productUser().subscribe(
      productUws => {
        this.dataSource = productUws
        console.log(productUws)
      },
      err => {
        console.error(err)
      })


  }
}

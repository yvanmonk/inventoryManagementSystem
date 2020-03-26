import { Component, OnInit } from '@angular/core';
import { ProduitsService, Product, ProductUser } from '../../services/produits.service';
import { AuthenticationService, UserAc } from "../../services/authentication.service";



@Component({
  selector: 'app-display-transaction',
  templateUrl: './display-transaction.component.html',
  styleUrls: ['./display-transaction.component.css'],
  providers: [AuthenticationService, ProduitsService]
})
export class DisplayTransactionComponent implements OnInit {
  product_user :  ProductUser = {
    id: 0,
    product_id: '',
    user_id: ''
  }
  product :  Product = {
    id: 0,
    name: '',
    description: '',
    barcode: '',
    statut: '',
    measure: '',
    price: ''
  }
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
  staffs: any
  products: any
  error = null
  updateSuccess = null
  deletedSuccess = null
  insertedSuccess = null
  success = null
  success_delete = null
  public staffItems: Array<string> = []
  public staffItemId: Array<string> = []
  public staffName: Array<string> = []
  public staffId: Array<string> = []
  public productItems: Array<string> = []
  public productItemsId: Array<string> = []
  public productName: Array<string> = []
  public merged: Array<string> = []

  constructor(private _serviceProd: ProduitsService, private _serviceUser: AuthenticationService) { }

  onRowInserted(e) {
    this._serviceProd.create_product(e.data).subscribe(
      insertedResult => {
        this.insertedSuccess = insertedResult.success
        console.log(this.insertedSuccess)
        this.get_product()
        this.get_user_account()
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
    this.get_product()
    this.get_user_account()
  }
  onRowUpdated(e) {
    console.log(e.data)
    this._serviceProd.update_products(e.data).subscribe(
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
    this._serviceProd.delete_products(e.data.id).subscribe(
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
    this.get_productUser()
  }
  get_user_account(){
    this._serviceUser.display_users().subscribe(
      staffs => {
        this.staffs = staffs.user
      },
      err => {
        console.error(err)
      })
  }
  get_product(){
    this._serviceProd.display_products().subscribe(
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
        // boucler sur la table product_user et recuperer les ids
        this.productName = productUws
        productUws.forEach(element => {
          this.staffItems.push(element["user_id"])
          this.productItems.push(element["product_id"])
        }); 
        // fin

        // boucler sur les produits pour recuperer les noms des produits
        this._serviceProd.display_products().subscribe(
          productId => {
            this.productItems = productId
            // productId.forEach(
            //   elements => {
            //     this.productItemsId.push(elements["id"])

            //     if( this.productItems == this.productItemsId) {
            //       // nom des produits
            //       this.productName.push(elements["name"])
            //       console.log('ete')
            //     }else{
            //       console.log('er')
            //     } 
            //   })
          },
          err => {
            console.error(err)
          })
        // fin

        // 
        this._serviceUser.display_users().subscribe(
          staffs => {
            this.staffName = staffs.user
            // staffs.user.forEach(elements => {
            //   this.staffItemId.push(elements["id"])
            //   if( this.staffItems == this.staffItemId) {
            //     this.staffName.push(elements["name"])
                
            //   }else{
            //     console.log('er')
            //   }
            // });
          },
          err => {
            console.error(err)
          })
        console.log(this.productItems, this.productName)
        this.dataSource = this.productName
      },
      err => {
        console.error(err)
      })

      // for(let i=0; i<this.productName.length; i++) {
      //   this.merged.push(
      //     { 
      //       this.productName[i], 
      //       (this.productItems.find(
      //       (itmInner) => itmInner.id === this.productName[i].))
      //     }
      //   );
      // }
      
      // console.log(merged);
  }
}

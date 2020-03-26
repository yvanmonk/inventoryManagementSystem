import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserAc } from "src/app/services/authentication.service";
import { ProduitsService, Product, ProductUser } from '../services/produits.service';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.component.html',
  styleUrls: ['./in-out.component.css'],
  providers:[AuthenticationService,ProduitsService]
})
export class InOutComponent implements OnInit {

  product :  Product = {
    id: 0,
    name: '',
    description: '',
    barcode: '',
    statut: '',
    measure: '',
    price: ''
  }
  product_user :  ProductUser = {
    id: 0,
    product_id: '',
    user_id: ''
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
  public staffItems: Array<string> = []
  public staffId: Array<string> = []
  public productItems: Array<string> = []
  public staffSelected: Number
  public productSelected: Number
  success = null

  constructor( private _service: ProduitsService, private data_account: AuthenticationService) { }

  ngOnInit() {
    this.get_product()
    this.get_user_account()
  }

  get_user_account(){
    this.data_account.display_users().subscribe(
      staffs => {
        staffs.user.forEach(element => {
          this.staffItems.push(element)
        });
      },
      err => {
        console.error(err)
      })
  }
  get_product(){
    this._service.display_products().subscribe(
      product => {
        console.log(product)
        product.forEach(element => {
          this.productItems.push(element)
        });
      },
      err => {
        console.error(err)
      })
  }
  submitRegister(){
    this._service.create_productUsage(this.product_user).subscribe(
      result => {
        this.success = result.success
        console.log(result)
      },
      error => console.error(error)
    )
  }

}

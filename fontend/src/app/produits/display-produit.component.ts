import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from "src/app/services/authentication.service";
import { ProduitsService, Product, Category } from '../services/produits.service';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-display-produit',
  templateUrl: './display-produit.component.html',
  styleUrls: ['./display-produit.component.css'],
  providers: [ProduitsService, AuthenticationService]
})
export class DisplayProduitComponent implements OnInit {
  @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;

  // product :  Product = {
  //   id: 0,
  //   name: '',
  //   description: '',
  //   barcode: '',
  //   statut: '',
  //   measure: '',
  //   price: '',
  //   category_id: ""
  // }
  // categories: Category ={
  //   id:0,
  //   name:'',
  //   description:''
  // }
  dataSource: any
  categories: any
  error = null
  updateSuccess = null
  deletedSuccess = null
  insertedSuccess = null
  success = null
  success_delete = null
  refreshModes: string[]
  refreshMode: string

	constructor(private _service: ProduitsService, private _router: Router) {}

  onRowInserted(e) {
    this._service.create_product(e.data).subscribe(
      insertedResult => {
        console.log(insertedResult)
        this.insertedSuccess = insertedResult.success
        console.log(this.insertedSuccess)
        this.refreshMode = "reshape"
        this.refreshModes = ["full", "reshape", "repaint"]
        this.get_product()
        this.get_categories()
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
  }
  onRowUpdated(e) {
    console.log(e.data)
    this._service.update_products(e.data).subscribe(
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
    this._service.delete_products(e.data.id).subscribe(
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
    this.get_product()
    this.get_categories()
  }

  get_product(){
    this._service.display_products().subscribe(
      success => {
        this.dataSource = success
        console.log(this.dataSource)
      },
      err => {
        console.error(err)
      })
  }
  get_categories(){
    this._service.display_categories().subscribe(
      success => {
        this.categories = success
        console.log(this.dataSource)
      },
      err => {
        console.error(err)
      })
  }
}

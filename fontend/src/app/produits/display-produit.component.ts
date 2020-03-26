import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from "src/app/services/authentication.service";
import { ProduitsService, Product } from '../services/produits.service';
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

  product :  Product = {
    id: 0,
    name: '',
    description: '',
    barcode: '',
    statut: '',
    measure: '',
    price: ''
  }
  dataSource: any;
  error = null;
  updateSuccess = null;
  deletedSuccess = null;
  insertedSuccess = null;
  success = null;
  success_delete = null;

	constructor(private _service: ProduitsService, private _router: Router) {}

  onRowInserted(e) {
    this._service.create_product(e.data).subscribe(
      insertedResult => {
        this.insertedSuccess = insertedResult.success
        console.log(this.insertedSuccess)
        this.get_product()
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
    this.get_product()
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

}

import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../services/category.service';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers:[CategoryService]
})
export class CategoriesComponent implements OnInit {
  category :  Category = {
    id: 0,
    name: '',
    description: ''
  }
  dataSource: any;
  error = null;
  updateSuccess = null;
  deletedSuccess = null;
  insertedSuccess = null;
  success = null;
  success_delete = null;

  constructor(private _service: CategoryService, private _router: Router) { }

  onRowInserted(e) {
    console.log(e.data)
    this._service.create_category(e.data).subscribe(
      insertedResult => {
        this.insertedSuccess = insertedResult.success
        console.log(this.insertedSuccess)
        this.get_category()
      },
      error => {
        this.success_delete = error
        console.log(error)
      }
    );
    this.get_category()
  }
  onRowUpdated(e) {
    console.log(e.data)
    this._service.update_category(e.data).subscribe(
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
    this._service.delete_category(e.data.id).subscribe(
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
    this.get_category()
  }

  get_category(){
    this._service.display_category().subscribe(
      success => {
        this.dataSource = success
        console.log(this.dataSource)
      },
      err => {
        console.error(err)
      })
  }
}

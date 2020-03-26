import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class Category {
	id: number;
	name: string;
	description: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private handleError: HandleError 

		constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService){
			this.handleError = httpErrorHandler.createHandleError('CategoryService')
    	}
    

		/**
		 * create_product
		 */
		public create_category(category: Category): Observable<any> {
			console.log(category)
			return this.http
				.post('/api/category', category,{ headers: {'Content-Type': 'application/json'} })
				.pipe(catchError(this.handleError('create_category', category)))
		}
		/**
		 * display_products
		 */
		public display_category(): Observable<any> {
			return this.http
				.get('/api/category', { headers:{Authorization: 'Bearer ${this.getToken()}'} })
				.pipe(catchError(this.handleError('display_category', [])))
		}
		/**
		 * delete_products
		 */
		public delete_category(id: number): Observable<any>{
			const url = `/api/category/${id}`
			return this.http
				.delete(url)
				.pipe(catchError(this.handleError('delete_category')))
		}
		/**
		 * update_product
		 */
		public update_category(category: Category): Observable<any> {
			return this.http
				.put(`/api/category/${category.id}`, category,{ headers: {'Content-Type': 'application/json'} })
				.pipe(catchError(this.handleError('update_category', category)))
		}

}

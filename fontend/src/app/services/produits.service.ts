import { Injectable } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorHandlerService, HandleError } from "./http-error-handler.service";
import { catchError } from 'rxjs/operators';


export class Product {
	id: number;
	name: string;
	description: string;
	barcode: string;
	statut: string;
	measure: string;
	price: string;
}
export class ProductUser {
	id: number;
	product_id: string;
	user_id: string;
}

	@Injectable({
	providedIn: 'root'
	})
	export class ProduitsService {
		private handleError: HandleError 

		constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService){
			this.handleError = httpErrorHandler.createHandleError('ProduitsService')
		}

		/**
		 * create_product
		 */
		public create_product(product: Product): Observable<any> {
			console.log(product)
			return this.http
				.post('/api/product', product,{ headers: {'Content-Type': 'application/json'} })
				.pipe(catchError(this.handleError('create_product', product)))
		}
		 /**
		 * create_productUsage on Database
		 */
		public create_productUsage(product_user:ProductUser): Observable<any> {
			console.log(product_user)
			return this.http.post(
			'/api/transaction', 
			{product_id: product_user.product_id, user_id:  product_user.user_id}, 
			{ headers: {'Content-Type': 'application/json'} }
			)
		}
		/**
		 * display_products
		 */
		public display_products(): Observable<any> {
			return this.http
				.get('/api/product', { headers:{Authorization: 'Bearer ${this.getToken()}'} })
				.pipe(catchError(this.handleError('display_products', [])))
		}
		/**
		 * display_products
		 */
		public display_productUser(): Observable<any> {
			return this.http
				.get('/api/transaction', { headers:{Authorization: 'Bearer ${this.getToken()}'} })
				.pipe(catchError(this.handleError('display_productUser', [])))
		}
		/**
		 * delete_products
		 */
		public delete_products(id: number): Observable<any>{
			const url = `/api/product/${id}`
			return this.http
				.delete(url)
				.pipe(catchError(this.handleError('delete_products')))
		}
		/**
		 * update_product
		 */
		public update_products(product: Product): Observable<any> {
			return this.http
				.put(`/api/product/${product.id}`, product,{ headers: {'Content-Type': 'application/json'} })
				.pipe(catchError(this.handleError('update_products', product)))
		}
	}


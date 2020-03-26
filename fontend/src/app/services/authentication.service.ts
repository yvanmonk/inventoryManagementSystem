import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from '../../entities/User';
import { map, mapTo, catchError } from "rxjs/operators";
import { HttpErrorHandlerService, HandleError } from "./http-error-handler.service";
import { Router } from "@angular/router";

export interface UserDetails {
  id: number
  name: string
  first_name: string
  email: string
  password: string
  phone: string
  city: string
  address: string
  poste: string
  role: string
  exp: number
  iat: number
}
export class Product {
	id: number
	name: string
	description: string
	barcode: string
	statut: string
	measure: string
	price: string
}
export interface UserAc {
  id: number
  name: string
  first_name: string
  email: string
  password: string
  phone: string
  city: string
  address: string
  poste: string
  role: string
}

interface TokenResponse{
  token: string
}
export interface TokenPayload {
  id:number
  name: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private token : string
  private handleError: HandleError 

  constructor(private http: HttpClient, private router: Router, httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('AuthenticationService')
  }
  

 private saveToken(token : string): void  {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string{
    if (!this.token){
      this.token = localStorage.getItem('usertoken');
    }
    return this.token
  }

  
  /**
   * getUserDetails
   */
  public getUserDetails() : UserDetails{
    const token = this.getToken()
    let payload
    if (token){
      payload= token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }

  /**
   * isLoggedIn
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if(user){
      return user.exp > Date.now() / 10000
    }else {
      console.log('erreur login')
      return false
    }
  }

  /**
   * register User on Database
   */
  public create_user(user: UserAc): Observable<any> {
    console.log(user)
    return this.http.post(
      '/api/register', 
      user, 
      { headers: {'Content-Type': 'application/json'} }
    )
  }

  /**
   *   public display_users
   */
  public display_users(): Observable<any> {
		return this.http.get(
		  '/api/userer', 
		  { headers:{Authorization: 'Bearer ${this.getToken()}'} }
		)
  }
  
  		/**
		 * delete_products
		 */
		public delete_user(id: number): Observable<any>{
			const url = `/api/userer/${id}`
			return this.http
				.delete(url)
				.pipe(catchError(this.handleError('delete_user')))
		}
		/**
		 * update_product
		 */
		public update_users(user: UserAc): Observable<any> {
			return this.http
				.put(`/api/userer/${user.id}`, user,{ headers: {'Content-Type': 'application/json'} })
				.pipe(catchError(this.handleError('update_users', user)))
		}

  /**
   * login (user:User): Observable<any> 
   */
  public login (user: TokenPayload): Observable<any> {

    const base = this.http.post( 
      '/api/login',
      {email: user.email, password: user.password},
      { headers:{'Content-Type': 'application/json'} }
    )
    console.log(user)
    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
            this.saveToken(data.token)
        }
        return data
      })
    )
        return request
  }

  /**
   * logout
   */
  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
 
  /**
   * profile
   */
  public profile(): Observable<any> {
    return this.http.get(
      '/api/profile', 
      { headers:{Authorization: 'Bearer ${this.getToken()}'} }
    )
  }
}
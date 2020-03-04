<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('api')->get('/user',  'UserController@index' );
Route::middleware('api')->get('/category', 'CategoryController@index');
Route::middleware('api')->get('/category/{id}', 'CategoryController@show');
Route::middleware('api')->get('/product', 'ProductController@index');
Route::middleware('api')->put('/product/{id}', 'ProductController@update');
Route::middleware('api')->post('/product', 'ProductController@store');
Route::middleware('api')->delete('/product/{id}', 'ProductController@destroy');
*/

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');
Route::get('profile', 'UserController@getAuthenticatedUser');

Route::middleware('auth::api')->get('/user', function(Request $request){
	return   $request->user();

});

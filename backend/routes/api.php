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
// Route::group([

//     'middleware' => 'api',
//     'prefix' => 'auth'

// ], function ($router) {

//     Route::post('login', 'AuthController@login');
//     Route::post('logout', 'AuthController@logout');
//     Route::post('refresh', 'AuthController@refresh');
//     Route::post('me', 'AuthController@me');
//     Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
//     Route::post('resetPassword', 'ChangePasswordController@process');

// });
Route::post('/transaction', 'ProductUserController@store');
Route::get('/transaction', 'ProductUserController@index');
Route::get('/transaction2', 'ProductUserController@create');

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');
Route::get('profile', 'UserController@getAuthenticatedUser');

Route::get('/userer', 'UserController@index');
Route::put('/userer/{id}', 'UserController@update');
Route::post('/userer', 'UserController@store');
Route::delete('/userer/{id}', 'UserController@destroy');

Route::get('/product', 'ProductController@index');
Route::put('/product/{id}', 'ProductController@update');
Route::post('/product', 'ProductController@store');
Route::delete('/product/{id}', 'ProductController@destroy');

Route::get('/category', 'CategoryController@index');
Route::put('/category/{id}', 'CategoryController@update');
Route::post('/category', 'CategoryController@store');
Route::delete('/category/{id}', 'CategoryController@destroy');

Route::middleware('auth::api')->get('/user', function(Request $request){
	return   $request->user();

});

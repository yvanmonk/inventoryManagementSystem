<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
	protected $fillable = ['name','barcode'];
	protected $guarded = ['id'];

	public function categories() {
		return $this->belongsTo('App\Category', 'categories');
	}

	public function user(){
		return $this->belongsToMany('App\User')->using('App\ProductUser');
	} 
}

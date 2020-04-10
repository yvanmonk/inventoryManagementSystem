<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
	protected $fillable = ['name','barcode', 'description', 'statut', 'measure', 'price','category_id'];
	protected $guarded = ['id'];

	public function categories() {
		return $this->belongsTo(Category::class);
	}

	// public function user(){
	// 	return $this->belongsToMany('App\User');
	// } 
}

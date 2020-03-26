<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\User;
use App\ProductUser;

class ProductUserController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $productUser = ProductUser::all();
        // dd(response()->json($ProductUser));
        return response()->json($productUser);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $pu = ProductUser::findOrFail($id);
        // $pu->create($request->json()->all());
        // $pure = 
        // $product = Product::findOrFail($id);
        // $user = User::findOrFail($id);
        // dd($pu);
		# Tes categories sous forme de collection !
		$categories = Category::all();

		# On peut utiliser les méthodes des collections Laravel :
		$categoriesWithArticlesCount = $categories->map(function($category) {
		    return ['category' => $category->name, 'articlesCount' => $category->produits()->count()];
		});
		dd($categories, $categoriesWithArticlesCount);
        // $product = Product::all();
        // $result = ProductUser::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
		// $validator = validator::make($request->json()->all(), [
  //           'product_id' => 'required|number',
  //           'user_id' => 'required|number'
  //       ]);

  //       if($validator->fails()){
  //           return response()->json($validator->errors()->toJson(), 400);
        // }
        $transaction = ProductUser::create([
            'product_id' => $request->json()->get('product_id'),
            'user_id' => $request->json()->get('user_id')
        ]);
        return response()->json(['success' => true, 'transaction'=> $transaction], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

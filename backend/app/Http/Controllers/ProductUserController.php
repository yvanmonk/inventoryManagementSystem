<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\User;
use App\ProductUser;
use App\Category;

class ProductUserController extends Controller
{

       
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productUserId = ProductUser::all();
        return response()->json( $productUserId );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, $id){

        // $transf = ProductUser::where('product_id', $request->get('product_id'))
        //             ->where('user_id', $request->get('user_id'))
        //             ->where('state', 'true')->first();
        $transf = ProductUser::where('product_id', $request->get('product_id'))
                    ->where('user_id', $request->get('user_id'))->first();

        if(!$transf){
            $product = Product::find($id);
            $product->update([
                'statut' => 'true'
            ]);
            return response()->json(['success' => true, 'product' => $product], 200);
        }
         return response()->json(['error' => true, 'message' =>'existe déjà'], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        // $transf = ProductUser::where('product_id', $request->get('product_id'))
        //             ->where('user_id', $request->get('user_id'))
        //             ->where('state', 'true')->first();
        $transf = ProductUser::where('product_id', $request->get('product_id'))
                    ->where('user_id', $request->get('user_id'))->first();
        if(!$transf){
            $transaction = ProductUser::create([
                'product_id' => $request->json()->get('product_id'),
                'user_id' => $request->json()->get('user_id'),
                'state' => "true"
            ]);
            return response()->json(['success' => true, 'transaction'=> $transaction], 201);
        }
        return response()->json(['error' => false, 'message'=> 'transaction already exist!'], 201);
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
        $product_user = ProductUser::find($id);
        $product_user->update($request->all());
        $product= Product::find($request->json()->get('product_id'));
        $product->update([
            'statut' => $request->json()->get('state')
        ]);
        return response()->json(['success' => true, 
            'product_user' => $product_user, 
            'product' => $product
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $product_user = ProductUser::find($id);
        $product_user->delete();
        return response()->json(['success' => true, 'product_user' => $product_user], 200);
    }

    public function destroy_state_product($id)
    {
        $product = Product::find($id);
        $product->update([
            'statut' => 'false'
        ]);
        return response()->json(['success' => true, 'product' => $product], 200);
    }

}

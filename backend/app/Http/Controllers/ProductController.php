<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();
        return response()->json($product);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $prodrequest = Product::create($request->all());
         $prodrequest = Product::create([
            'name' => $request->json()->get('name'),
            'description' => $request->json()->get('description'),
            'barcode' => $request->json()->get('barcode'),
            'statut' => "false",
            'measure' => $request->json()->get('measure'),
            'price' => $request->json()->get('price'),
            'category_id' => $request->json()->get('category_id')
        ]);
        return response()->json(['success' => true, 'prodrequest'=> $prodrequest], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $prod = Product::findOrFail($id);
        return response()->json($prod);

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
        $produpdate = Product::findOrFail($id);
        $produpdate->update($request->all());
        return response()->json(['success' => true, 'produpdate'=> $produpdate], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $proddestroy = Product::findOrFail($id);
        $proddestroy->delete($request->all());
        return response()->json(['success' => true, 'proddestroy'=> $proddestroy], 201);
    }
}

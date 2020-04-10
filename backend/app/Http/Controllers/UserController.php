<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exception\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $user = User::where("role", "admin")->get();
        return response()->json(['user' => $user], 200);
    }
    public function alle()
    {
        $user = User::all();
        return response()->json(['user' => $user], 200);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function staffIndex()
    {
        $user = User::where("role", "staff")->get();
        return response()->json(['user' => $user], 200);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createStaff(Request $request)
    {
        $staff = User::where('name', $request->get('name'))
                    ->where('phone', $request->get('phone'))
                    ->where('poste', $request->get('poste'))->first();

        if(!$staff){
            $validator = Validator::make($request->json()->all(), [
                'name' => 'required|string|max:255',
                'first_name' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'poste' => 'required|string|max:255'
            ]);
            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::create([
                'name' => $request->json()->get('name'),
                'first_name' => $request->json()->get('first_name'),
                'email' => $request->json()->get('email'),
                'password' => $request->json()->get('password'),
                'phone' => $request->json()->get('phone'),
                'poste' => $request->json()->get('poste'),
                'role' => "staff",
                'city' => $request->json()->get('city'),
                'address' => $request->json()->get('address')
            ]);
            return response()->json(["success" => true, 'user' => $user], 201);
        }
        return response()->json(["error" => false, "message" => "Staff already exist"], 400);
    }

 
    public function register(Request $request)
    {
        $user_account = User::where('name', $request->get('name'))->where('phone', $request->get('phone'))->first();

        if(!$user_account){
            $validator = Validator::make($request->json()->all(), [
                'name' => 'required|string|max:255',
                'first_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'phone' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'poste' => 'required|string|max:255'
            ]);


            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::create([
                'name' => $request->json()->get('name'),
                'first_name' => $request->json()->get('first_name'),
                'email' => $request->json()->get('email'),
                'password' => Hash::make($request->json()->get('password')),
                'phone' => $request->json()->get('phone'),
                'poste' => $request->json()->get('poste'),
                'role' => "admin",
                'city' => $request->json()->get('city'),
                'address' => $request->json()->get('address')
            ]);
            $token = JWTAuth::fromUser($user);

            // return response()->json(['success' => true, 'user' => $user, 'token'=> $token], 201);
            return response()->json(['success' => true, 'user' => $user, 'token'=> $token], 201);
        } 
        return response()->json(['error' => false, "message" => "User name and phone number already exist"], 400);

    }


    public function login(Request $request){
        $credentials = $request->json()->all();

        try{
            if(! $token = JWTAuth::attempt($credentials)){
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        }catch(JWTException $e){
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    /**
     * Returns Authenticated User Details
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // $request->user()->token()->revoke();
        // return response()->json(['user' => "Mahantesh Kumbar", 'loggedout' => true], 200);
    }
    public function getAuthenticatedUser()
    {
        try {
            if(!$user == JWTAuth::parseToken()->authenticate()){
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        } 

        return response()->json(compact('user')); 
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
       $user = User::find($id);
        return response()->json(['user' => $user], 200);
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
        $user = User::find($id);
        return response()->json(['user' => $user], 200);
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
        $user = User::find($id);
        $user->update($request->all());
        return response()->json(['success' => true, 'user' => $user], 200);
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
        $user = User::find($id);
        $user->delete();
        return response()->json(['success' => true, 'user' => $user], 200);
    }
}

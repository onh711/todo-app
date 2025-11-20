<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Baby;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {

        $request->validate([
            'name' => ['required', 'string', 'max:40'],
            'mail_address' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'min:8'],
            'baby_name' => ['string', 'max:40']
        ]);

        $user = User::create([
            'name' => $request->name,
            'mail_address' => $request->mail_address,
            'password' => Hash::make($request->password),
        ]);
        
        $baby = Baby::create([
            'user_id' => $user->id,
            'baby_name' => $request->baby_name,
        ]);


        return response()->json([
            'message' => '作成成功',
            'user' => $user,
            'baby' =>$baby
        ], 201);
    }
}
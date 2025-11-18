<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'mail_address' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($credentials)){
        return response()->json(['message'=>'ログイン成功'],200);
        }
        return response()->json(['message' => 'ログイン失敗'], 401);
    }
}

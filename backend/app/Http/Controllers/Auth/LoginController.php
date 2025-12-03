<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'mail_address' => ['required', 'string', 'email'],
            'password' => ['required', 'string']
        ]);

        $authCredentials = [
            'mail_address' => $credentials['mail_address'],
            'password' => $credentials['password'],
        ];

        if(Auth::attempt($authCredentials)){
            $request->session()->regenerate();
            return response()->json([
                'message'=>'ログイン成功',
                'user' => Auth::user(),
            ],200);
        }
        return response()->json(['message' => 'ログイン失敗'], 401);
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
   public function logout(){
     Auth::logout();
    //  Session::invalidate();
    //  Session::regenerateToken();

     return response()->json([
            'message' => 'ログアウト完了',
        ], 200);
   }
}

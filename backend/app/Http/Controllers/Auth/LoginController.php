<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'mail_address' => ['required', 'string'],
            'password' => ['required', 'string']
        ]);

        if(Auth::attempt($credentials)){
            $request->session()->regenerate();

            return redirect()->intended('tasks');
        }

        return back()->withErrors([
            'mail_address' => 'ユーザーIDとパスワードが一致しません'
        ])->onlyInput('mail_address');
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /**
     * 登録フォームを表示する
     *
     * @return \Illuminate\View\View
     */
    public function showRegistrationForm()
    {
        return view('register');
    }

    /**
     * 新しいユーザーインスタンスを作成し、保存する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function register(Request $request)
    {
        // 1. リクエストのデータを検証する
        $request->validate([
            'name' => ['required', 'string', 'max:40'],
            'mail_address' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 2. 新しいユーザーを作成する
        $user = User::create([
            'name' => $request->user_name,
            'mail_address' => $request->mail_address,
            'password' => Hash::make($request->password),
        ]);

        // 3. ユーザー登録イベントを発行する
        event(new Registered($user));

        // 4. ユーザーをログインさせる
        Auth::login($user);

        // 5. ダッシュボードページにリダイレクトする
        return redirect()->route('tasks');
    }
}

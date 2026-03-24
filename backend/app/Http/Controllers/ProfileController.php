<?php

namespace App\Http\Controllers;

use App\Models\Baby;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $baby = Baby::where('user_id', $user->id)->first();

        return response()->json([
            'name' => $user->name,
            'mail_address' => $user->mail_address,
            'baby_name' => $baby?->baby_name ?? '',
        ], 200);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:40'],
            'mail_address' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'mail_address')->ignore($user->id),
            ],
            'baby_name' => ['required', 'string', 'max:40'],
        ]);

        $user->name = $validated['name'];
        $user->mail_address = $validated['mail_address'];
        $user->save();

        $baby = Baby::firstOrCreate(
            ['user_id' => $user->id],
            ['baby_name' => $validated['baby_name']]
        );
        $baby->baby_name = $validated['baby_name'];
        $baby->save();

        return response()->json([
            'message' => '更新しました',
            'profile' => [
                'name' => $user->name,
                'mail_address' => $user->mail_address,
                'baby_name' => $baby->baby_name,
            ],
        ], 200);
    }
}


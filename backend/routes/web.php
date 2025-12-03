<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;


// Route::get('/', function () {
//     return view('welcome');
// });

// Route::post('/login', [LoginController::class, 'authenticate'])->name('login');

Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/logout', [LoginController::class, 'logout']);
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\BabyController;
use App\Http\Controllers\BabyActionController;

Route::apiResource('/tasks', TaskController::class);
// Route::post('/register', [BabyController::class, 'store']);

// Route::apiResource('/register', RegisterController::class);
Route::post('/register', [RegisterController::class, 'register']);

// Route::apiResource('/login', LoginController::class);
Route::post('/login', [LoginController::class, 'authenticate']);

Route::post('/logout',[LogoutController::class, 'logout']);

Route::apiResource('/dashbord', BabyActionController::class);








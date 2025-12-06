<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\BabyController;
use App\Http\Controllers\BabyActionController;

// Route::post('/register', [BabyController::class, 'store']);

// Route::apiResource('/register', RegisterController::class);

Route::apiResource('/tasks', TaskController::class);
Route::post('/register', [RegisterController::class, 'register']);
Route::apiResource('/dashboard', BabyActionController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
});

Route::put('/drop/{id}', [BabyActionController::class,'updateEventToDrop']);








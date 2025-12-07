<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BabyActionController;

Route::post('/register', [RegisterController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
  Route::apiResource('/dashboard', BabyActionController::class);
  Route::apiResource('/tasks', TaskController::class);
  Route::put('/drop/{id}', [BabyActionController::class,'updateEventToDrop']);
});









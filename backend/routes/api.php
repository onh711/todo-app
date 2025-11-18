<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

// Route::get('/test', function () {
//     return response()->json(
//         ['message' => 'API動作確認OK'],
//         Response::HTTP_OK,
//         [],
//         JSON_UNESCAPED_UNICODE
//     );
// });/

// Route::get('/tasks',[TaskController::class, 'index']);
// Route::post('/tasks',[TaskController::class, 'store']);
// Route::put('/tasks/{id}', [TaskController::class, 'update']);
// Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

Route::resource('/tasks', TaskController::class);

Route::get('/register', [RegisterController::class, 'showRegistrationForm']);
Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', [LoginController::class, 'authenticate']);






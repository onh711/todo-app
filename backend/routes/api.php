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

Route::apiResource('/tasks', TaskController::class);


// Route::post('register', [RegisterController::class, 'register']);
// Route::resource('register', RegisterController::class);


Route::apiResource('/login', LoginController::class);
// Route::resource('/login', LoginController::class);

Route::post('/login', [LoginController::class, 'authenticate']);






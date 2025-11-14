<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
use App\Http\Controllers\TaskController;

// Route::get('/test', function () {
//     return response()->json(
//         ['message' => 'API動作確認OK'],
//         Response::HTTP_OK,
//         [],
//         JSON_UNESCAPED_UNICODE
//     );
// });/

Route::get('/tasks',[TaskController::class, 'index']);
Route::post('/tasks',[TaskController::class, 'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);



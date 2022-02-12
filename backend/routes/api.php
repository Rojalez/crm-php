<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'Auth\PassportAuthController@register');
Route::post('login', 'Auth\PassportAuthController@login');

Route::middleware('auth:api')->group(function () {
    Route::prefix('time-tracker')->group(function () {
        Route::apiResources([
            'user' => \TimeTracker\UserController::class,
            'task' => \TimeTracker\TaskController::class,
            'comment' => \TimeTracker\CommentController::class,
            'timer'=>\TimeTracker\TimerController::class,
        ]);
    });
});






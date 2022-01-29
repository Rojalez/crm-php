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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
    Route::prefix('time-tracker')->group(function () {
        Route::apiResources([
            'user' => \TimeTracker\UserController::class,
        ]);
    });
});

Route::get('/users', function () {
    $users = [
        [
            'name' => 'Sultan',
            'age' => '24'
        ],
        [
            'name' => 'Beknazar',
            'age' => '26'
        ]
    ];
    return json_encode($users);
});

Route::get('/user/{id}/{test}/', function ($id, $test) {
    $users = [
        [
            'name' => 'Sultan',
            'age' => '24'

        ],
        [
            'name' => 'Beknazar',
            'age' => '26'
        ]
    ];
    return json_encode($users[$id][$test]);
});

Route::get('/', function ($id, $test) {
    $users = [
        [
            'name' => 'Sultan',
            'age' => '24'

        ],
        [
            'name' => 'Beknazar',
            'age' => '26'
        ]
    ];
    return json_encode($users[$id][$test]);
});

Route::prefix('time-tracker')->group(function () {
    Route::apiResources([
        'task' => \TimeTracker\TaskController::class,
    ]);
});






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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/api_get_user', 'App\Http\Controllers\ReactUserManagemntController@getUser')->name('api.get.user');

Route::get('/api_get_all_users', 'App\Http\Controllers\ReactUserManagemntController@getAllUsers')->name('api.get.all.users');

Route::post('/api_update_user', 'App\Http\Controllers\ReactUserManagemntController@updateUser')->name('api.update.user');

<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth/login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/react_user_management', 'App\Http\Controllers\ReactUserManagemntController@reactUserManagement')->name('react.user.managemant');

Route::post('/api_get_user', 'App\Http\Controllers\ReactUserManagemntController@getUser')->name('api.get.user');

Route::get('/api_get_all_users', 'App\Http\Controllers\ReactUserManagemntController@getAllUsers')->name('api.get.all.users');

Route::post('/api_update_user', 'App\Http\Controllers\ReactUserManagemntController@updateUser')->name('api.update.user');

Route::fallback(function () {
	return redirect('/react_user_management');
});

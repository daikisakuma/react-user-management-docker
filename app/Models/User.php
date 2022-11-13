<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image',
        'birth_place',
        'hobby',
        'special_skill',
        'favorite_entertainer',
        'is_show',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * ユーザー情報一覧取得
     * @static
     * @access public
     * @param void
     * @return array ユーザー一覧
     *
     */
    public static function getAllUsers() {
        $allUsers = User::get();
        return $allUsers;
    }

    /**
     * ユーザー取得
     * @static
     * @access public
     * @param request
     * @return array ユーザー
     *
     */
    public static function getUser($request) {
        $user = User::where('email', '=', $request->email)->first();
        return $user;
    }

    /**
     * ユーザー情報更新
     * @static
     * @access public
     * @param request
     * @return void
     *
     */
    public static function updateUser($request) {
        $objDao = self::find($request->id);
        switch ($request->operation_mode) {
            case "userDetail":
                $image = (!is_string($request->profile_image)) ? $request->profile_image->store('public/image') : "";
                $image = str_replace('public/image/', '', $image);
                $image && ($objDao->profile_image = $image);

                $objDao->name                 = $request->name;
                $objDao->birth_place          = $request->birth_place;
                $objDao->animal               = $request->animal;
                $objDao->hobby                = $request->hobby;
                $objDao->special_skill        = $request->special_skill;
                $objDao->favorite_entertainer = $request->favorite_entertainer;
                break;

            case "settingUserDetail":
                $objDao->name     = $request->name;
                $objDao->email    = $request->email;
                $objDao->is_show  = $request->is_show;
                $objDao->is_admin = $request->is_admin;
                break;
        }

        $objDao->save();


        return $objDao;
    }

}

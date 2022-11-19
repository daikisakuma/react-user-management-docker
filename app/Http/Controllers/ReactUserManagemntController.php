<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReactUserManagemntController extends Controller
{
    /**
     * react_user_management画面へ遷移
     *
     * @access public
     * @return \Illuminate\Http\Response
     */
    public function reactUserManagement()
    {
        return view('task.reactUserManagement');
    }

    /**
     * ユーザー情報一覧取得
     * @access public
     * @param void
     * @return array ユーザー一覧
     */
    public function registerUser(Request $request)
    {
        $user = \App\Models\User::registerUser($request);
        return $user;
    }

    /**
     * ユーザー情報一覧取得
     * @access public
     * @param void
     * @return array ユーザー一覧
     */
    public function getAllUsers()
    {
        $allUsers = \App\Models\User::getAllUsers();
        return $allUsers;
    }

    /**
     * ユーザー取得
     * @access public
     * @param request
     * @return array ユーザー一覧
     */
    public function getUser(Request $request)
    {
        $user = \App\Models\User::getUser($request);
        return $user;
    }

    /**
     * ユーザー情報更新
     * @access public
     * @param request
     * @return void
     */
    public function updateUser(Request $request)
    {
        $user = \App\Models\User::updateUser($request);
        return $user;
    }

}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersTable01 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("alter table users add column `profile_image` varchar(255) null comment 'プロフィール画像' after email");
        DB::statement("alter table users add column `birth_place` varchar(255) null comment '出身地' after profile_image");
        DB::statement("alter table users add column `animal` varchar(255) null comment '自分を動物に例えると' after birth_place");
        DB::statement("alter table users add column `hobby` varchar(255) null comment '趣味' after animal");
        DB::statement("alter table users add column `special_skill` varchar(255) null comment '特技' after hobby");
        DB::statement("alter table users add column `favorite_entertainer` varchar(255) null comment '好きな芸能人' after special_skill");
        DB::statement("alter table users add column `is_show` tinyint null comment 'プロフィール表示フラグ' after favorite_entertainer");
        DB::statement("alter table users add column `is_admin` tinyint null comment '管理者権限' after is_show");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('alter table users drop column `profile_image`');
        DB::statement('alter table users drop column `animal`');
        DB::statement('alter table users drop column `birth_place`');
        DB::statement('alter table users drop column `hobby`');
        DB::statement('alter table users drop column `special_skill`');
        DB::statement('alter table users drop column `favorite_entertainer`');
        DB::statement('alter table users drop column `is_show`');
    }
}

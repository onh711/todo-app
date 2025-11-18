<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
        'name' => 'test',
        'mail_address' => '111@gmail.com',
        'password' => bcrypt('test1234'),
        'baby_name' => 'testest',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
         ]);
    }
}

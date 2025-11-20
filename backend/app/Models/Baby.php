<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Baby extends Model
{
    protected $fillable = [
        'user_id',
        'baby_name'
    ];

    protected $table = 'babys';
 

    public function baby_actions()
    {
        return $this->hasMany('App\Models\BabyAction');
    }
}

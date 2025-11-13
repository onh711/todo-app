<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'content',
        'status',
        'start_date',
        'due_date',
    ];

    public function getStatusAttribute()
    {
        switch ($this->attributes['status']) {
            case '1':
                return '未着手';
            case '2':
                return '進行中';
            case '3':
                return '完了';
            case '4':
                return '期限切れ';
        }
    }
}

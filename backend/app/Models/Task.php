<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'status',
        'start_date',
        'due_date',
    ];

    public function getStatusTextAttribute()
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

    protected $appends = ['status_text'];   

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}

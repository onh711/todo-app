<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BabyAction extends Model
{
    protected $fillable = [
        'baby_id',
        'action',
        'cry',
        'start_date',
        'end_date',
        'milk_amount',
        'memo'
    ];

    public function getActionTextAttribute()
    {
        switch ($this->attributes['action']) {
            case '1':
                return '寝る';
            case '2':
                return '授乳';
            case '3':
                return 'ご飯';
            case '4':
                return 'うんち';
            case '5':
                return 'おしっこ';
            case '6':
                return 'うんち/おしっこ';
        }
    }

    protected $appends = ['action_text'];   

    public function baby()
    {
        return $this->belongsTo(Baby::class,'id');
    }
}

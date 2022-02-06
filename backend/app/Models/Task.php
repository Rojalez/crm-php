<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'text',
        'user_id',
        'executor_id',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function executor()
    {
        return $this->belongsTo(User::class, 'executor_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'task_id', 'id');
    }
}

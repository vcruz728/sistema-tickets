<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $table = 'areas';
    protected $primaryKey = 'id';

    protected $fillable = ['nombre_area'];

    public $timestamps = false;


    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function procesos()
    {
        return $this->hasMany(Proceso::class);
    }
}

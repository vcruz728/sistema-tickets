<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Importancia extends Model
{
    protected $table = 'importancia';
    protected $primaryKey = 'id';

    protected $fillable = ['descripcion'];

    public $timestamps = false;


    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'importancia_id');
    }
}

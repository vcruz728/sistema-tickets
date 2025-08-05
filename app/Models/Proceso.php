<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proceso extends Model
{
    protected $table = 'procesos';
    protected $primaryKey = 'id';

    protected $fillable = ['nombre_proceso', 'area_id'];

    public $timestamps = false;


    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'proceso_id');
    }
}

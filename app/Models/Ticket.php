<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = 'tickets';
    protected $primaryKey = 'id';

    protected $fillable = [
        'usuario_id',
        'proceso_id',
        'importancia_id',
        'descripcion',
        'estado',
        'fecha_apertura',
        'fecha_cierre',
    ];
    public $timestamps = false;


    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function proceso()
    {
        return $this->belongsTo(Proceso::class, 'proceso_id');
    }

    public function importancia()
    {
        return $this->belongsTo(Importancia::class, 'importancia_id');
    }

    public function respuestas()
    {
        return $this->hasMany(Respuesta::class, 'ticket_id');
    }
}

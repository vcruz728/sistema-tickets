<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Anexo extends Model
{
    protected $fillable = [
        'ticket_id',
        'respuesta_id',
        'nombre_archivo',
        'ruta_archivo',
        'mime',
        'size',
    ];

    public $timestamps = false;

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function respuesta(): BelongsTo
    {
        return $this->belongsTo(Respuesta::class);
    }
}

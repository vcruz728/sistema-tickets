<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespuestaUsuario extends Model
{
    use HasFactory;
    protected $table = 'respuestas_usuario';
    public $timestamps = false;

    protected $fillable = [
        'ticket_id',
        'user_id',
        'tipo',
        'motivo',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

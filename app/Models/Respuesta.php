<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Respuesta extends Model
{
    protected $fillable = [
        'ticket_id',
        'user_id',
        'tipo',
        'descripcion',
    ];

    const UPDATED_AT = null;

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function anexos(): HasMany
    {
        return $this->hasMany(Anexo::class);
    }
}

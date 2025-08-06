<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Anexo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory;
    protected $table = 'tickets';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'proceso_id',
        'importancia_id',
        'descripcion',
        'estado',
        'fecha_apertura',
        'fecha_cierre',
    ];
    public $timestamps = false;


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function proceso()
    {
        return $this->belongsTo(Proceso::class);
    }

    public function importancia()
    {
        return $this->belongsTo(Importancia::class);
    }

    public function respuestas()
    {
        return $this->hasMany(Respuesta::class);
    }

    public function anexos(): HasMany
    {
        return $this->hasMany(Anexo::class);
    }

    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
        ];
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    protected $primaryKey = 'id';

    protected $fillable = ['nombre_rol'];

    public $timestamps = false;


    public function usuarios()
    {
        return $this->hasMany(User::class, 'role_id');
    }
}

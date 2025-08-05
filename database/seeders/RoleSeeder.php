<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['Director', 'Usuario', 'Soporte'];

        foreach ($roles as $nombre) {
            Role::create(['nombre_rol' => $nombre]);
        }
    }
}

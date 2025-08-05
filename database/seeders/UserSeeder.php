<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Area;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $rolUsuario = Role::where('nombre_rol', 'Usuario')->first();
        $areaVentas = Area::where('nombre_area', 'Ventas')->first();


        if ($rolUsuario && $areaVentas) {
            User::create([
                'name' => 'Victor Hugo Cruz Garcia',
                'email' => 'vcruz728@hotmail.com',
                'password' => bcrypt('password123'),
                'role_id' => $rolUsuario->id,
                'area_id' => $areaVentas->id,
                'proceso_id' => null,
            ]);
        }
    }
}

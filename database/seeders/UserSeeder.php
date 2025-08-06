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

        User::create([
            'name' => 'Usuario Soporte',
            'email' => 'soporte1@example.com',
            'password' => bcrypt('password123'),
            'role_id' => 3,
            'area_id' => 5,
            'proceso_id' => 2,
        ]);

        User::create([
            'name' => 'Usuario Soporte Desarrollo Web',
            'email' => 'soporte2@example.com',
            'password' => bcrypt('password123'),
            'role_id' => 3,
            'area_id' => 5,
            'proceso_id' => 1,
        ]);

        User::create([
            'name' => 'Usuario Soporte Redes',
            'email' => 'soporte3@example.com',
            'password' => bcrypt('password123'),
            'role_id' => 3,
            'area_id' => 5,
            'proceso_id' => 3,
        ]);

        User::create([
            'name' => 'Usuario Director',
            'email' => 'soporte4@example.com',
            'password' => bcrypt('password123'),
            'role_id' => 1,
            'area_id' => 6,
            'proceso_id' => null,
        ]);
    }
}

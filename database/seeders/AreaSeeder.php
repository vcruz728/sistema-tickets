<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;

class AreaSeeder extends Seeder
{
    public function run(): void
    {
        $areas = ['Ventas', 'Marketing', 'Finanzas', 'RRHH', 'Sistemas', 'Dirección'];

        foreach ($areas as $nombre) {
            Area::create(['nombre_area' => $nombre]);
        }
    }
}


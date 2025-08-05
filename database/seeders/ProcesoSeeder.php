<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proceso;
use App\Models\Area;

class ProcesoSeeder extends Seeder
{
    public function run(): void
    {
        $areaSistemas = Area::where('nombre_area', 'Sistemas')->first();

        if ($areaSistemas) {
            $procesos = ['Desarrollo Web', 'Soporte', 'Redes'];

            foreach ($procesos as $nombre) {
                Proceso::create([
                    'nombre_proceso' => $nombre,
                    'area_id' => $areaSistemas->id
                ]);
            }
        }
    }
}

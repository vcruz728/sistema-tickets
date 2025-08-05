<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Importancia;

class ImportanciaSeeder extends Seeder
{
    public function run(): void
    {
        $niveles = ['Baja', 'Media', 'Alta', 'Urgente'];

        foreach ($niveles as $descripcion) {
            Importancia::create(['descripcion' => $descripcion]);
        }
    }
}

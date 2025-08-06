<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\Proceso;
use App\Models\Importancia;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
            'proceso_id' => Proceso::inRandomOrder()->first()?->id ?? Proceso::factory(),
            'importancia_id' => Importancia::inRandomOrder()->first()?->id ?? Importancia::factory(),
            'descripcion' => $this->faker->paragraph(3),
            'estado' => $this->faker->randomElement(['Abierto', 'Cerrado']),
            'fecha_apertura' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'fecha_cierre' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}

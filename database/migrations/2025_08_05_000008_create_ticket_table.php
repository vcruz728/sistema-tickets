<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id(); // id
            $table->foreignId('usuario_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('proceso_id')->constrained('procesos')->onDelete('cascade');
            $table->foreignId('importancia_id')->constrained('importancia');
            $table->text('descripcion');
            $table->enum('estado', ['Abierto', 'Cerrado', 'Reabierto'])->default('Abierto');
            $table->timestamp('fecha_apertura')->useCurrent();
            $table->timestamp('fecha_cierre')->nullable();
            
        });
    }

    public function down(): void {
        Schema::dropIfExists('tickets');
    }
};

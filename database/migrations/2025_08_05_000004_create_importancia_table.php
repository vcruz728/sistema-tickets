<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('importancia', function (Blueprint $table) {
            $table->id(); // id
            $table->string('descripcion')->unique(); // Baja, Media, Alta, Urgente
        });
    }

    public function down(): void {
        Schema::dropIfExists('importancia');
    }
};

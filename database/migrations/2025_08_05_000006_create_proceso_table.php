<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('procesos', function (Blueprint $table) {
            $table->id(); // id
            $table->string('nombre_proceso');
            $table->foreignId('area_id')->constrained('areas')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('procesos');
    }
};

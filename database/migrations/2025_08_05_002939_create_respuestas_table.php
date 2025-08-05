<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuestasTable extends Migration
{
    public function up()
    {
        Schema::create('respuestas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained('tickets')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users');
            $table->enum('tipo', ['solicitud', 'respuesta_soporte', 'rechazo_usuario']);
            $table->text('descripcion');
        });
    }

    public function down()
    {
        Schema::dropIfExists('respuestas');
    }
};
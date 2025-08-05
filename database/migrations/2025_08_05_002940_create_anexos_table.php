<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnexosTable extends Migration
{
    public function up()
    {
        Schema::create('anexos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->nullable()->constrained('tickets')->onDelete('cascade');
            $table->foreignId('respuesta_id')->nullable()->constrained('respuestas');
            $table->string('nombre_archivo');
            $table->string('ruta_archivo');
            $table->string('mime')->nullable();
            $table->integer('size')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('anexos');
    }
}

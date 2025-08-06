<?php

namespace App\Http\Controllers;

use App\Models\RespuestaUsuario;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RespuestaUsuarioController extends Controller
{
    public function store(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'tipo' => 'required|in:aceptado,rechazado',
            'motivo' => 'nullable|string|max:1000',
            'anexos.*' => 'nullable|file|max:1024', // Máximo 1MB por archivo
        ]);

        DB::beginTransaction();

        try {
            $respuesta = new RespuestaUsuario();
            $respuesta->ticket_id = $ticket->id;
            $respuesta->user_id = Auth::id();
            $respuesta->tipo = $validated['tipo'];
            $respuesta->motivo = $validated['tipo'] === 'rechazado' ? $validated['motivo'] : null;
            $respuesta->save();

            // Adjuntar archivos si existen
            if ($request->hasFile('anexos')) {
                foreach ($request->file('anexos') as $archivo) {
                    $path = $archivo->store('anexos');
                    $respuesta->anexos()->create([
                        'nombre_archivo' => $archivo->getClientOriginalName(),
                        'ruta_archivo' => $path,
                    ]);
                }
            }

            // Cambiar estado del ticket
            if ($respuesta->tipo === 'aceptado') {
                $ticket->estado = 'CerradoDefinitivo';
            } else {
                $ticket->estado = 'Reabierto';
            }
            $ticket->save();

            DB::commit();

            return redirect()->back()->with('success', 'Respuesta registrada correctamente.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Error al registrar la respuesta: ' . $e->getMessage()]);
        }
    }
}

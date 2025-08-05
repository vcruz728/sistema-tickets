<?php

namespace App\Http\Controllers;
use App\Models\Respuesta;
use App\Models\Ticket;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class RespuestaController extends Controller
{
public function store(Request $request, Ticket $ticket)
{
    $request->validate([
        'descripcion' => 'required|string|max:2000',
        'tipo' => 'required|in:respuesta_soporte,rechazo_usuario,solicitud',
    ]);

    Respuesta::create([
        'ticket_id' => $ticket->id,
        'user_id' => auth()->id(),
        'tipo' => $request->input('tipo'),
        'descripcion' => $request->input('descripcion'),
    ]);

    return redirect()->back()->with('success', 'Respuesta enviada correctamente.');
}

}

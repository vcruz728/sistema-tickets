<?php

namespace App\Http\Controllers\Soporte;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Notifications\TicketCerrado;
use Illuminate\Support\Facades\Log;


class TicketSoporteController extends Controller
{
    public function index()
    {
        $usuario = Auth::user();

        if ($usuario->role->nombre_rol === 'Soporte' && $usuario->proceso_id) {
            $tickets = Ticket::with([
                'proceso',
                'importancia',
                'respuestas.user' // <-- IMPORTANTE
            ])
                ->where('proceso_id', $usuario->proceso_id)
                ->orderBy('id', 'desc')
                ->paginate(10)
                ->withQueryString();

            // Para las tarjetas resumen
            $todosTickets = Ticket::with('respuestas')
                ->where('proceso_id', $usuario->proceso_id)
                ->get();
        } elseif ($usuario->role->nombre_rol === 'Soporte' && !$usuario->proceso_id) {
            abort(403, 'No tienes proceso asignado');
        } else {
            $tickets = collect();
            $todosTickets = collect();
        }

        return Inertia::render('Soporte/ListadoTicketsSoporte', [
            'tickets' => $tickets,
            'todos_tickets' => $todosTickets,
            'user' => $usuario,
        ]);
    }


    public function responder(Request $request, Ticket $ticket)
    {
        $request->validate([
            'comentario' => 'required|string',
            'archivos.*' => 'required|file|max:1024',
        ]);

        $respuesta = $ticket->respuestas()->create([
            'ticket_id'   => $ticket->id,
            'user_id'     => auth()->id(),
            'tipo'        => 'respuesta_soporte',
            'descripcion' => $request->comentario,
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombre = $archivo->store('anexos', 'public');

                $respuesta->anexos()->create([
                    'ticket_id'      => $ticket->id,
                    'respuesta_id'   => $respuesta->id,
                    'nombre_archivo' => $archivo->getClientOriginalName(),
                    'ruta_archivo'   => $nombre,
                    'mime'           => $archivo->getClientMimeType(),
                    'size'           => $archivo->getSize(),
                ]);
            }
        }

        $ticket->update([
            'estado' => 'Cerrado',
            'fecha_cierre' => now(),
        ]);

                // ENVIAR NOTIFICACION AL USUARIO
            // 2. Verificar que tenga relación con usuario
            if ($ticket->user) {
                Log::info("Notificando al usuario {$ticket->user->id} sobre cierre del ticket {$ticket->id}");

                // 3. Enviar notificación
                $ticket->user->notify(new TicketCerrado($ticket));
            } else {
                Log::warning("El ticket {$ticket->id} no tiene usuario relacionado");
            }

            return back()->with('success', 'Ticket cerrado y usuario notificado.');
        }
            

    public function detalle(Ticket $ticket)
    {
        $ticket->load([
            'respuestas.user',
            'respuestas.anexos',
            'proceso',
            'importancia',
        ]);

        return response()->json([
            'ticket' => $ticket,
        ]);
    }
}

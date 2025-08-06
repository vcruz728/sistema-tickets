<?php

namespace App\Http\Controllers\Soporte;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Ticket;

class TicketSoporteController extends Controller
{

    public function index()
    {
        $usuario = Auth::user();

        if ($usuario->role->nombre_rol === 'Soporte' && $usuario->proceso_id) {
            $tickets = Ticket::with(['proceso', 'importancia'])
                ->where('proceso_id', $usuario->proceso_id)
                ->orderBy('id', 'desc')
                ->get();
        } elseif ($usuario->role->nombre_rol === 'Soporte' && !$usuario->proceso_id) {
            abort(403, 'No tienes proceso asignado');
        } else {
            $tickets = collect();
        }


        return Inertia::render('Soporte/ListadoTicketsSoporte', [
            'tickets' => $tickets,
            'user' => $usuario,
        ]);
    }
}

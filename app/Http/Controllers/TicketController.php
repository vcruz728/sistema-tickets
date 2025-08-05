<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Ticket;
use App\Models\Anexo;
use App\Models\Importancia;
use App\Models\Proceso;

class TicketController extends Controller
{
    public function create()
    {
        return Inertia::render('Usuario/CrearTicket', [
            #       'procesos' => Proceso::whereHas('area', fn($q) => $q->where('nombre_area', 'Sistemas'))->get(),
            #       'importancias' => Importancia::all(),
            'procesos' => Proceso::all(),
            'importancias' => Importancia::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'proceso_id' => ['required', 'exists:procesos,id'],
            'importancia_id' => ['required', 'exists:importancia,id'],
            'descripcion' => ['required', 'string', 'max:1000'],
            'archivos.*' => ['nullable', 'file', 'max:1024', 'mimes:pdf,docx,xlsx,xls,jpg,jpeg,png'],
        ]);

        // Crear el ticket
        $ticket = Ticket::create([
            'proceso_id' => $validated['proceso_id'],
            'importancia_id' => $validated['importancia_id'],
            'descripcion' => $validated['descripcion'],
            'usuario_id' => Auth::id(),
            'estado' => 'Abierto',
        ]);

        // Subir archivos
        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $ruta = $archivo->store('anexos', 'public');

                Anexo::create([
                    'ticket_id'      => $ticket->id,
                    'nombre_archivo' => $archivo->getClientOriginalName(),
                    'ruta_archivo'   => $ruta,
                    'mime'           => $archivo->getClientMimeType(),
                    'size'           => $archivo->getSize(),
                ]);
            }
        }

        return redirect()->route('tickets.create')->with('success', 'Ticket creado correctamente.');
    }
}

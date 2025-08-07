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
use App\Mail\TicketMailable;
use Illuminate\Support\Facades\Mail;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with(['importancia', 'proceso', 'anexos'])
            ->where('user_id', Auth::id())
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Usuario/ListadoTickets', [
            'tickets' => $tickets
        ]);
    }

    public function create()
    {
        return Inertia::render('Usuario/CrearTicket', [
            #       'procesos' => Proceso::whereHas('area', fn($q) => $q->where('nombre_area', 'Sistemas'))->get(),
            #       'importancias' => Importancia::all(),
            'procesos' => Proceso::all(),
            'importancias' => Importancia::all(),
        ]);
    }

    public function show(Ticket $ticket)
    {
        // Aseguramos que solo el dueño vea su ticket
        if ($ticket->user_id !== auth()->id()) {
            \Log::info('Acceso denegado al ticket', [
                'ticket_id' => $ticket->id,
                'propietario' => $ticket->user_id,
                'usuario_actual' => auth()->id(),
            ]);
            abort(403);
        }

        $ticket->load(['proceso', 'importancia', 'anexos', 'respuestas.user']);

        return Inertia::render('Usuario/DetalleTicket', [
            'ticket' => $ticket,
        ]);
    }
    public function guardarRespuesta(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'descripcion' => 'required|string|max:1000',
        ]);

        $ticket->respuestas()->create([
            'user_id' => auth()->id(),
            'tipo' => 'respuesta_soporte', // o 'solicitud' según el contexto
            'descripcion' => $validated['descripcion'],
        ]);

        return back()->with('success', 'Respuesta enviada.');
    }


public function dashboard(Request $request)
{
    $estado = $request->input('estado');

    $query = Ticket::with(['proceso', 'importancia', 'anexos', 'respuestas.user'])
        ->where('user_id', auth()->id());

    if ($estado === 'abierto') {
        $query->where('estado', 'Abierto');
    } elseif ($estado === 'resuelto') {
        $query->where('estado', '!=', 'Abierto');
    }

    $tickets = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

    $todos = Ticket::where('user_id', auth()->id())->get();

    return Inertia::render('Usuario/DashboardUsuario', [
        'tickets' => $tickets,
        'todos_tickets' => $todos,
        'filtro_actual' => $estado ?? 'todos',
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
            'user_id' => Auth::id(),
            'estado' => 'Abierto',
        ]);

        // Subir archivos
        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $ruta = $archivo->store('anexos');
                $nombreGuardado = basename($ruta);

                Anexo::create([
                    'ticket_id'      => $ticket->id,
                    'nombre_archivo' => $archivo->getClientOriginalName(),
                    'ruta_archivo'   => $nombreGuardado,
                    'mime'           => $archivo->getClientMimeType(),
                    'size'           => $archivo->getSize(),
                ]);
            }
        }

        Mail::to($ticket->user->email)->send(
        new TicketMailable($ticket, $ticket->user->name, 'creado')
        );
        return redirect()->route('tickets.create')->with('success', 'Ticket creado correctamente.');
    }

    public function responder(Request $request, Ticket $ticket)
    {
        $request->validate([
            'comentario' => 'required|string',
            'archivos.*' => 'nullable|file|max:1024',
        ]);

        $respuesta = $ticket->respuestas()->create([
            'ticket_id'   => $ticket->id,
            'user_id'     => auth()->id(),
            'tipo'        => 'respuesta_usuario',
            'descripcion' => $request->comentario,
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombre = $archivo->store('anexos');

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

        return back()->with('success', 'Ticket cerrado correctamente.');
    }
    public function pendientes()
    {
        $user = Auth::user();

        $tickets = $user->tickets()
            ->where('estado', 'Cerrado')
            ->whereDoesntHave('respuestasUsuario') // Aún no ha dado su aceptación o rechazo
            ->with(['proceso', 'importancia', 'anexos']) // relaciones útiles
            ->latest()
            ->get();

        return Inertia::render('Usuario/TicketsPendientes', [
            'tickets' => $tickets,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class DirectorController extends Controller
{
    public function index()
    {
        return Inertia::render('Director/Inicio');
    }

    public function reporteSemanal()
    {
        $areas = Area::with(['users.tickets'])->get();

        $reporte = $areas->map(function ($area) {
            $tickets = $area->users->flatMap->tickets;

            $total = $tickets->count();

            $sin_respuesta_tiempo = $tickets->filter(function ($ticket) {
                return $ticket->estado === 'Abierto' &&
                    now()->diffInHours(Carbon::parse($ticket->fecha_apertura)) <= 72;
            })->count();

            $respondido_tiempo = $tickets->filter(function ($ticket) {
                return $ticket->estado === 'Cerrado' &&
                    $ticket->fecha_cierre &&
                    Carbon::parse($ticket->fecha_cierre)->diffInHours(Carbon::parse($ticket->fecha_apertura)) <= 72;
            })->count();

            $sin_respuesta_fuera_tiempo = $tickets->filter(function ($ticket) {
                return $ticket->estado === 'Abierto' &&
                    now()->diffInHours(Carbon::parse($ticket->fecha_apertura)) > 72;
            })->count();

            $respondido_fuera_tiempo = $tickets->filter(function ($ticket) {
                return $ticket->estado === 'Cerrado' &&
                    $ticket->fecha_cierre &&
                    Carbon::parse($ticket->fecha_cierre)->diffInHours(Carbon::parse($ticket->fecha_apertura)) > 72;
            })->count();

            return [
                'id' => $area->id,
                'nombre' => $area->nombre_area,
                'total' => $total,
                'sin_respuesta_tiempo' => $sin_respuesta_tiempo,
                'respondido_tiempo' => $respondido_tiempo,
                'sin_respuesta_fuera_tiempo' => $sin_respuesta_fuera_tiempo,
                'respondido_fuera_tiempo' => $respondido_fuera_tiempo,
            ];
        });

        return Inertia::render('Director/ReporteSemanal', [
            'reporte' => $reporte,
        ]);
    }

    public function descargarPDF()
    {
        $areas = Area::with(['users.tickets'])->get();

        $reporte = $areas->map(function ($area) {
            $tickets = $area->users->flatMap->tickets;
            $total = $tickets->count();

            $sin_respuesta_tiempo = $tickets->filter(function ($t) {
                return $t->estado === 'Abierto' &&
                    now()->diffInHours(Carbon::parse($t->fecha_apertura)) <= 72;
            })->count();

            $respondido_tiempo = $tickets->filter(function ($t) {
                return $t->estado === 'Cerrado' &&
                    $t->fecha_cierre &&
                    Carbon::parse($t->fecha_cierre)->diffInHours(Carbon::parse($t->fecha_apertura)) <= 72;
            })->count();

            $sin_respuesta_fuera_tiempo = $tickets->filter(function ($t) {
                return $t->estado === 'Abierto' &&
                    now()->diffInHours(Carbon::parse($t->fecha_apertura)) > 72;
            })->count();

            $respondido_fuera_tiempo = $tickets->filter(function ($t) {
                return $t->estado === 'Cerrado' &&
                    $t->fecha_cierre &&
                    Carbon::parse($t->fecha_cierre)->diffInHours(Carbon::parse($t->fecha_apertura)) > 72;
            })->count();

            return [
                'area' => $area->nombre_area,
                'total' => $total,
                'sin_respuesta_tiempo' => $sin_respuesta_tiempo,
                'respondido_tiempo' => $respondido_tiempo,
                'sin_respuesta_fuera_tiempo' => $sin_respuesta_fuera_tiempo,
                'respondido_fuera_tiempo' => $respondido_fuera_tiempo,
            ];
        });

        $pdf = Pdf::loadView('pdf.reporte_semanal', ['reporte' => $reporte])->setPaper('letter', 'portrait');

        return $pdf->download('reporte_semanal.pdf');
    }

    public function promedioRespuestaSistemas()
    {
        $areaSistemas = Area::where('nombre_area', 'Sistemas')->with(['users.tickets'])->first();

        $procesos = [];

        if ($areaSistemas) {
            foreach ($areaSistemas->users as $user) {
                $proceso = $user->proceso->nombre_proceso ?? 'Sin Proceso';

                foreach ($user->tickets->where('estado', 'Cerrado') as $ticket) {
                    if ($ticket->fecha_apertura && $ticket->fecha_cierre) {
                        $diffHoras = Carbon::parse($ticket->fecha_cierre)->diffInHours(Carbon::parse($ticket->fecha_apertura));

                        $procesos[$proceso][] = $diffHoras;
                    }
                }
            }
        }


        $resultado = collect($procesos)->map(function ($tiempos, $proceso) {
            $total = count($tiempos);
            $promedio = $total > 0 ? array_sum($tiempos) / $total : 0;
            return [
                'proceso' => $proceso,
                'promedio_horas' => round($promedio, 2)
            ];
        })->values();

        return Inertia::render('Director/PromedioRespuesta', [
            'datos' => $resultado
        ]);
    }

    public function reportePromedioSistemas()
    {
        // Filtrar área de Sistemas
        $area = Area::where('nombre_area', 'Sistemas')->with('users.tickets.proceso')->first();

        $tickets = $area->users->flatMap->tickets->filter(function ($ticket) {
            return $ticket->estado === 'Cerrado' && $ticket->fecha_cierre && $ticket->proceso;
        });

        $agrupadoPorProceso = $tickets->groupBy(fn($t) => $t->proceso->nombre_proceso);

        $reporte = $agrupadoPorProceso->map(function ($tickets, $proceso) {
            $totalHoras = $tickets->sum(function ($t) {
                return \Carbon\Carbon::parse($t->fecha_cierre)->diffInHours(\Carbon\Carbon::parse($t->fecha_apertura));
            });

            $promedioHoras = round($totalHoras / $tickets->count(), 2);

            return [
                'proceso' => $proceso,
                'cantidad' => $tickets->count(),
                'promedio' => $promedioHoras,
            ];
        })->values();

        return Inertia::render('Director/ReportePromedioSistemas', [
            'reporte' => $reporte
        ]);
    }
    public function descargarPromedioPDF()
    {
        $area = Area::where('nombre_area', 'Sistemas')->with('users.tickets.proceso')->first();

        $tickets = $area->users->flatMap->tickets->filter(function ($ticket) {
            return $ticket->estado === 'Cerrado' &&
                $ticket->fecha_cierre &&
                $ticket->proceso;
        });

        $agrupadoPorProceso = $tickets->groupBy(fn($t) => $t->proceso->nombre_proceso);

        $reporte = $agrupadoPorProceso->map(function ($tickets, $proceso) {
            $totalHoras = $tickets->sum(function ($t) {
                return \Carbon\Carbon::parse($t->fecha_cierre)->diffInHours(\Carbon\Carbon::parse($t->fecha_apertura));
            });

            $promedioHoras = round($totalHoras / $tickets->count(), 2);

            return [
                'proceso' => $proceso,
                'cantidad' => $tickets->count(),
                'promedio' => $promedioHoras,
            ];
        })->values();

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.reporte_promedio_sistemas', [
            'reporte' => $reporte
        ])->setPaper('letter', 'portrait');

        return $pdf->download('promedio_sistemas.pdf');
    }
}

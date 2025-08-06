<?php

namespace App\Http\Controllers;

use App\Models\Anexo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AnexoController extends Controller
{
public function download(Anexo $anexo)
{
    $user = Auth::user();

    if (!$user) {
        abort(403, 'Debes estar autenticado para descargar el archivo.');
    }

    $rutaCompleta = 'anexos/' . $anexo->ruta_archivo;

    if (!Storage::disk('local')->exists($rutaCompleta)) {
        abort(404, 'Archivo no encontrado.');
    }

    return Storage::disk('local')->download($rutaCompleta, $anexo->nombre_archivo);
}



}

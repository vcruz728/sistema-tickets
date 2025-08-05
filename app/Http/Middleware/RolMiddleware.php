<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RolMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $usuario = $request->user();

        if ($usuario && in_array($usuario->role->nombre_rol, $roles)) {
            return $next($request);
        }

        abort(403, 'No tienes permiso para acceder a esta ruta.');
    }
}
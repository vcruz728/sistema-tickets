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

        if ($usuario) {
            // Asegura que la relación 'role' esté cargada
            $usuario->loadMissing('role');

            logger()->info('ROL Middleware', [
                'usuario_id' => $usuario->id,
                'nombre_rol' => $usuario->role?->nombre_rol,
                'esperado' => $roles,
            ]);

            if (in_array($usuario->role?->nombre_rol, $roles)) {
                return $next($request);
            }
        }

        abort(403, 'No tienes permiso para acceder a esta ruta.');
    }
}

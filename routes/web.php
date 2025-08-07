<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    ProfileController,
    TicketController,
    Soporte\TicketSoporteController,
    RespuestaUsuarioController,
    DirectorController,


};
use App\Models\Anexo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\AnexoController;
use App\Mail\TicketMailable;
use Illuminate\Support\Facades\Mail;



Route::get('/anexos/descargar/{anexo}', [AnexoController::class, 'download'])
     ->middleware('auth')
     ->name('anexos.descargar');

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

// 🔐 Perfil de usuario
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 👤 Usuario normal
Route::middleware(['auth', 'rol:Usuario'])->group(function () {
    Route::get('/tickets/dashboard', [TicketController::class, 'dashboard'])->name('dashboard');
    Route::get('/tickets/crear', [TicketController::class, 'create'])->name('tickets.create');
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
    Route::get('/tickets/pendientes', [TicketController::class, 'pendientes'])->name('tickets.pendientes');
    Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
    Route::post('/tickets/{ticket}/responder', [TicketController::class, 'responder'])->name('tickets.responder');
    Route::post('/tickets/{ticket}/respuestas', [TicketController::class, 'guardarRespuesta'])->name('tickets.respuestas.store');
    Route::post('/tickets/{ticket}/respuesta-usuario', [RespuestaUsuarioController::class, 'store'])->name('tickets.respuesta_usuario');

    // 🔔 Notificaciones
    Route::post('/notifications/marcar-todas', function () {
        auth()->user()->unreadNotifications->markAsRead();
        return back();
    })->name('notifications.readAll');
});

// 🛠 Soporte
Route::middleware(['auth', 'rol:Soporte'])->group(function () {
    Route::get('/soporte/tickets', [TicketSoporteController::class, 'index'])->name('soporte.tickets.index');
    Route::get('/soporte/tickets/{ticket}/detalle', [TicketSoporteController::class, 'detalle'])->name('soporte.tickets.detalle');
    Route::post('/soporte/tickets/{ticket}/responder', [TicketSoporteController::class, 'responder'])->name('soporte.tickets.responder');
});

// 📊 Director
Route::middleware(['auth', 'rol:Director'])->group(function () {
    Route::get('/director/inicio', [DirectorController::class, 'index'])->name('director.index');

    // Reporte semanal
    Route::get('/director/reporte', [DirectorController::class, 'reporteSemanal'])->name('director.reporte');
    Route::get('/director/reporte/pdf', [DirectorController::class, 'descargarPDF'])->name('director.reporte.pdf');

    // Promedio por proceso
    Route::get('/director/promedio-respuesta', [DirectorController::class, 'reportePromedioSistemas'])->name('director.promedio');
    Route::get('/director/reporte-promedio-sistemas/pdf', [DirectorController::class, 'descargarPromedioPDF'])->name('director.reporte.promedio.pdf');
});

    //Correo
    Route::get('correo',function () {
        Mail::to('vcruz728@hotmail.com')
        ->send(new TicketMailable);
        return 'Correo enviado correctamente';
    })->name('correo');


require __DIR__ . '/auth.php';
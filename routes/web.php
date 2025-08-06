<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\Soporte\TicketSoporteController;


Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'rol:Usuario'])->group(function () {
    Route::get('/tickets/dashboard', [TicketController::class, 'dashboard'])->name('dashboard');
    Route::get('/tickets/crear', [TicketController::class, 'create'])->name('tickets.create');
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
    Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show');
    Route::post('/tickets/{ticket}/respuestas', [TicketController::class, 'guardarRespuesta'])->name('tickets.respuestas.store');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
});



Route::middleware(['auth', 'rol:Soporte'])->group(function () {
    Route::get('/soporte/tickets', [TicketSoporteController::class, 'index'])->name('soporte.tickets.index');
    Route::post('/tickets/{ticket}/responder', [TicketSoporteController::class, 'responder'])->name('tickets.responder');
    Route::get('/tickets/{ticket}', [TicketSoporteController::class, 'detalle'])->name('tickets.detalle');

});


require __DIR__ . '/auth.php';

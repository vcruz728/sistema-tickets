<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RespuestaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TicketController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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

require __DIR__ . '/auth.php';

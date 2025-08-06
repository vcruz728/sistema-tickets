<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Ticket;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class TicketCerrado extends Notification implements ShouldQueue
{
    use Queueable;

    public $ticket;

    public function __construct(Ticket $ticket)
    {
        $this->ticket = $ticket;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Tu ticket #{$this->ticket->id} ha sido cerrado")
            ->line("El ticket con asunto: {$this->ticket->descripcion} ha sido cerrado por el área de soporte.")
            ->action('Ver ticket', url("/tickets/{$this->ticket->id}"))
            ->line('Gracias por usar el sistema de tickets.');
    }

    public function toDatabase($notifiable)
    {
        return [
            'ticket_id' => $this->ticket->id,
            'mensaje' => "El ticket #{$this->ticket->id} ha sido cerrado.",
        ];
    }

    public function toArray($notifiable)
    {
        return [
            'ticket_id' => $this->ticket->id,
            'mensaje' => "El ticket #{$this->ticket->id} ha sido cerrado.",
        ];
    }
}
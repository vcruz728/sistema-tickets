<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Notificación de Ticket</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <tr>
            <td style="background-color: #004085; color: white; padding: 16px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <h2 style="margin: 0;">Mesa de Tickets</h2>
            </td>
        </tr>
        <tr>
            <td style="padding: 24px;">
                <p>Hola <strong>{{ $nombreUsuario }}</strong>,</p>

                <p>
                    Te notificamos que tu ticket con ID <strong>#{{ $ticket->id }}</strong> ha sido <strong>{{ $accion }}</strong>.
                </p>

                <p>
                    <strong>Proceso:</strong> {{ $ticket->proceso->nombre_proceso ?? 'N/A' }}<br>
                    <strong>Estado:</strong> {{ $ticket->estado }}<br>
                    <strong>Importancia:</strong> {{ $ticket->importancia->nivel ?? 'N/A' }}<br>
                    <strong>Descripción:</strong><br>
                    <em>{{ $ticket->descripcion }}</em>
                </p>

                @if($accion === 'cerrado' && $ticket->fecha_cierre)
                    <p><strong>Fecha de cierre:</strong> {{ $ticket->fecha_cierre }}</p>
                @endif

                <p style="margin-top: 20px;">Puedes ingresar al sistema para ver más detalles.</p>

                <p style="margin-top: 30px;">Saludos,<br>Equipo de Mesa de Tickets</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #e9ecef; text-align: center; padding: 12px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 12px; color: #666;">
                Este correo fue generado automáticamente por el sistema de tickets.
            </td>
        </tr>
    </table>
</body>
</html>

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Ticket } from '@/types/ticket';

interface Props extends PageProps {
    tickets: Ticket[];
}

export default function TicketsPendientes({ auth, tickets }: Props) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold text-gray-800 dark:text-white">Tickets por aceptar</h2>}
        >
            <Head title="Tickets por aceptar" />

            <div className="space-y-4">
                {tickets.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-300">No hay tickets pendientes de aceptación.</p>
                )}

                {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                        <p><strong>ID:</strong> {ticket.id}</p>
                        <p><strong>Estado:</strong> {ticket.estado}</p>
                        <p><strong>Descripción:</strong> {ticket.descripcion}</p>

                        {/* Próximamente: botón para aceptar/rechazar */}
                        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
                            Revisar ticket
                        </button>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

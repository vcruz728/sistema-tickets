import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import type { Ticket } from '@/types/ticket';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ModalDetalleTicketUsuario from '@/Components/ModalDetalleTicketUsuario';

export default function ListadoTickets() {
    const { tickets, auth } = usePage<PageProps<{ tickets: Ticket[] }>>().props;
    
    const [ticketSeleccionado, setTicketSeleccionado] = useState<Ticket | null>(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    const abrirModal = (ticket: Ticket) => {
        setTicketSeleccionado(ticket);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setTicketSeleccionado(null);
        setModalAbierto(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-2xl font-bold text-gray-800 dark:text-white">Mis Tickets</h2>}
        >
            <Head title="Mis Tickets" />

            <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
                <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Mis Tickets
                </h1>

                {tickets.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">No tienes tickets registrados.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="p-3 text-left text-gray-800 dark:text-gray-200">ID</th>
                                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Proceso</th>
                                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Importancia</th>
                                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Estado</th>
                                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Descripción</th>
                                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Anexos</th>
                                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                            {tickets.map(ticket => (
                                <tr key={ticket.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-3">{ticket.id}</td>
                                    <td className="p-3">{ticket.proceso?.nombre_proceso}</td>
                                    <td className="p-3">{ticket.importancia?.descripcion}</td>
                                    <td className="p-3">{ticket.estado}</td>
                                    <td className="p-3">{ticket.descripcion}</td>
                                    <td className="p-3">
                                        {ticket.anexos.length > 0 ? (
                                            <ul className="list-disc list-inside space-y-1">
                                                {ticket.anexos.map((anexo, index) => (
                                                    <li key={index}>
                                                        <a
                                                            href={`/storage/${anexo.ruta_archivo}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 dark:text-blue-400 underline"
                                                        >
                                                            {anexo.nombre_archivo ?? 'Ver archivo'}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="italic text-gray-500 dark:text-gray-400">Sin archivos</span>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => abrirModal(ticket)}
                                            className="text-blue-600 dark:text-blue-400 underline text-sm"
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {modalAbierto && ticketSeleccionado && (
                <ModalDetalleTicketUsuario
                    ticket={ticketSeleccionado}
                    onClose={cerrarModal}
                />
            )}
        </AuthenticatedLayout>
    );
}

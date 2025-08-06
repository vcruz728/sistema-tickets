import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { PageProps } from '@/types';

export default function DashboardSoporte({ tickets }: { tickets: any[] }) {
    const [filtro, setFiltro] = useState<'todos' | 'abierto' | 'resuelto'>('todos');
    const { user } = usePage<PageProps>().props;

    const total = tickets.length;
    const pendientes = tickets.filter(ticket => ticket.estado === 'Abierto').length;
    const resueltos = tickets.filter(ticket => ticket.estado !== 'Abierto').length;

    const ticketsFiltrados = tickets.filter(ticket => {
        if (filtro === 'abierto') return ticket.estado === 'Abierto';
        if (filtro === 'resuelto') return ticket.estado !== 'Abierto';
        return true; // todos
    });

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Inicio</h2>}
        >
            <Head title="Inicio" />

            <div className="space-y-8">
                {/* Tarjetas resumen clicables */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                        onClick={() => setFiltro('todos')}
                        className="bg-blue-100 dark:bg-blue-900 dark:text-white rounded-lg shadow p-6 text-center hover:bg-blue-200 dark:hover:bg-blue-800 transition cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold">Total</h3>
                        <p className="text-3xl mt-2">{total}</p>
                    </div>

                    <div
                        onClick={() => setFiltro('abierto')}
                        className="bg-yellow-100 dark:bg-yellow-800 dark:text-white rounded-lg shadow p-6 text-center hover:bg-yellow-200 dark:hover:bg-yellow-700 transition cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold">Pendientes</h3>
                        <p className="text-3xl mt-2">{pendientes}</p>
                    </div>

                    <div
                        onClick={() => setFiltro('resuelto')}
                        className="bg-green-100 dark:bg-green-900 dark:text-white rounded-lg shadow p-6 text-center hover:bg-green-200 dark:hover:bg-green-800 transition cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold">Resueltos</h3>
                        <p className="text-3xl mt-2">{resueltos}</p>
                    </div>
                </div>

                {/* Lista de tickets filtrada */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        {filtro === 'todos' && 'Todos los Tickets'}
                        {filtro === 'abierto' && 'Tickets Pendientes'}
                        {filtro === 'resuelto' && 'Tickets Resueltos'}
                    </h3>

                    <div className="space-y-4">
                        {ticketsFiltrados.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400">No hay tickets registrados.</p>
                        ) : (
                            ticketsFiltrados.map(ticket => (
                                <a
                                    key={ticket.id}
                                href={
                                    user?.rol === 'Usuario'
                                        ? route('tickets.show', ticket.id)
                                        : route('soporte.tickets.detalle', ticket.id)
                                }
                                    className="block"
                                >
                                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer">
                                        <h4 className="font-bold">#{ticket.id} - {ticket.titulo ?? 'Ticket'}</h4>
                                        <p>Estado: <span className="font-semibold">{ticket.estado}</span></p>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TarjetaSemaforo from '@/Components/TarjetaSemaforo';
import TicketCard from '@/Components/TicketCard';
import ModalDetalleTicket from '@/Components/ModalDetalleTicket';
import Pagination from '@/Components/Pagination';
import type { PageProps } from '@/types';
import type { Ticket } from '@/types/ticket';

export default function ListadoTicketsSoporte() {
    const { tickets: paginados, todos_tickets, auth } = usePage<PageProps<{ tickets: { data: Ticket[], links: any[] }, todos_tickets: Ticket[] }>>().props;
    const user = usePage().props.user;

    const proceso = user?.proceso?.nombre_proceso?.toLowerCase() ?? '';
    const encabezado = `Tickets asignados a ${proceso}`;

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
    const [ticketSeleccionado, setTicketSeleccionado] = useState<Ticket | null>(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const porPagina = 5;

    const calcularCategoria = (ticket: Ticket): string => {
        const apertura = new Date(ticket.fecha_apertura);
        const cierre = ticket.fecha_cierre ? new Date(ticket.fecha_cierre) : new Date();
        const tiempoMs = cierre.getTime() - apertura.getTime();
        const dentroDe72h = tiempoMs < 72 * 60 * 60 * 1000;

        if (ticket.estado === 'Abierto') return dentroDe72h ? 'amarillo' : 'naranja';
        if (ticket.estado === 'Cerrado') return dentroDe72h ? 'verde' : 'rojo';
        return 'otro';
    };

    const ticketsFiltrados = categoriaSeleccionada
        ? todos_tickets.filter(t => calcularCategoria(t) === categoriaSeleccionada)
        : [];

    const totalPaginas = Math.ceil(ticketsFiltrados.length / porPagina);
    const inicio = (paginaActual - 1) * porPagina;
    const ticketsPagina = ticketsFiltrados.slice(inicio, inicio + porPagina);

    const handleCambioPagina = (pagina: number) => {
        setPaginaActual(pagina);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {encabezado}
                </h2>
            }
        >
            <Head title={encabezado} />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                {/* Tarjetas de colores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {['amarillo', 'naranja', 'verde', 'rojo'].map(categoria => {
                        const total = todos_tickets?.filter(t => calcularCategoria(t) === categoria).length ?? 0;
                        return (
                            <TarjetaSemaforo
                                key={categoria}
                                categoria={categoria as any}
                                total={total}
                                onClick={() => {
                                    setCategoriaSeleccionada(categoria);
                                    setTicketSeleccionado(null);
                                    setPaginaActual(1);
                                }}
                                activa={categoriaSeleccionada === categoria}
                            />
                        );
                    })}
                </div>

                {/* Listado filtrado paginado */}
                {categoriaSeleccionada && (
                    <div className="space-y-2">
                        {ticketsPagina.map(ticket => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                onClick={setTicketSeleccionado}
                            />
                        ))}

                        {totalPaginas > 1 && (
                            <div className="mt-4 flex justify-center space-x-2">
                                {[...Array(totalPaginas)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleCambioPagina(i + 1)}
                                        className={`px-3 py-1 rounded ${paginaActual === i + 1 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white border'} hover:bg-blue-100`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Detalles del ticket seleccionado */}
                {ticketSeleccionado && (
                    <ModalDetalleTicket
                        ticket={ticketSeleccionado}
                        onClose={() => setTicketSeleccionado(null)}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TarjetaSemaforo from '@/Components/TarjetaSemaforo';
import TicketCard from '@/Components/TicketCard';
import DetalleTicket from '@/Components/DetalleTicket';
import type { PageProps } from '@/types';
import type { Ticket } from '@/types/ticket';
import ModalDetalleTicket from '@/Components/ModalDetalleTicket';


export default function ListadoTicketsSoporte() {
    const { tickets, auth } = usePage<PageProps<{ tickets: Ticket[] }>>().props;
    const { props } = usePage();
    const user = props.user;

    const proceso = user?.proceso?.nombre_proceso?.toLowerCase() ?? '';
    const encabezado = `Tickets asignados a ${proceso}`;

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
    const [ticketSeleccionado, setTicketSeleccionado] = useState<Ticket | null>(null);

    const calcularCategoria = (ticket: Ticket): string => {
        const apertura = new Date(ticket.fecha_apertura);
        const cierre = ticket.fecha_cierre ? new Date(ticket.fecha_cierre) : new Date();
        const tiempoMs = cierre.getTime() - apertura.getTime();
        const dentroDe72h = tiempoMs < 72 * 60 * 60 * 1000;

        if (ticket.estado === 'Abierto') return dentroDe72h ? 'amarillo' : 'naranja';
        if (ticket.estado === 'Cerrado') return dentroDe72h ? 'verde' : 'rojo';
        return 'otro';
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
                        const total = tickets.filter(t => calcularCategoria(t) === categoria).length;
                        return (
                            <TarjetaSemaforo
                                key={categoria}
                                categoria={categoria as any}
                                total={total}
                                onClick={() => {
                                    setCategoriaSeleccionada(categoria);
                                    setTicketSeleccionado(null);
                                }}
                                activa={categoriaSeleccionada === categoria}
                            />

                        );
                    })}
                </div>

                {/* Listado filtrado */}
                {categoriaSeleccionada && (
                    <div className="space-y-2">
                        {tickets
                            .filter(t => calcularCategoria(t) === categoriaSeleccionada)
                            .map(ticket => (
                                <TicketCard
                                    key={ticket.id}
                                    ticket={ticket}
                                    onClick={() => setTicketSeleccionado(ticket)}
                                />
                            ))}
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

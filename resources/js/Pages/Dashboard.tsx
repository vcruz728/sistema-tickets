import { usePage } from '@inertiajs/react'
import type { PageProps } from '@/types'
import type { Ticket } from '@/types/ticket'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function Dashboard() {
    const { tickets } = usePage<PageProps<{ tickets: Ticket[] }>>().props
    const [filtro, setFiltro] = useState<'todos' | 'pendientes' | 'resueltos'>('todos')

    const total = tickets.length
    const pendientes = tickets.filter(ticket => ticket.estado !== 'Cerrado')
    const resueltos = tickets.filter(ticket => ticket.estado === 'Cerrado')

    const ticketsFiltrados = 
        filtro === 'pendientes' ? pendientes :
        filtro === 'resueltos' ? resueltos :
        tickets

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-800">Resumen de Tickets</h2>}
        >
            <Head title="Resumen de Tickets" />

            {/* Tarjetas resumen con clics */}
            <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div
                    className="bg-blue-100 p-4 rounded shadow text-center cursor-pointer hover:bg-blue-200"
                    onClick={() => setFiltro('todos')}
                >
                    <h3 className="text-lg font-semibold text-blue-700">Total</h3>
                    <p className="text-3xl font-bold text-blue-800">{total}</p>
                </div>
                <div
                    className="bg-yellow-100 p-4 rounded shadow text-center cursor-pointer hover:bg-yellow-200"
                    onClick={() => setFiltro('pendientes')}
                >
                    <h3 className="text-lg font-semibold text-yellow-700">Pendientes</h3>
                    <p className="text-3xl font-bold text-yellow-800">{pendientes.length}</p>
                </div>
                <div
                    className="bg-green-100 p-4 rounded shadow text-center cursor-pointer hover:bg-green-200"
                    onClick={() => setFiltro('resueltos')}
                >
                    <h3 className="text-lg font-semibold text-green-700">Resueltos</h3>
                    <p className="text-3xl font-bold text-green-800">{resueltos.length}</p>
                </div>
            </div>

            {/* Lista de tickets según el filtro */}
            <div className="max-w-5xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    {filtro === 'todos' ? 'Todos los Tickets' : filtro === 'pendientes' ? 'Tickets Pendientes' : 'Tickets Resueltos'}
                </h3>
                {ticketsFiltrados.length === 0 ? (
                    <p className="text-gray-500">No hay tickets para mostrar.</p>
                ) : (
                    <ul className="space-y-4">
                        {ticketsFiltrados.map(ticket => (
                            <li key={ticket.id} className="bg-white rounded shadow p-4">
                                <h4 className="text-lg font-semibold text-gray-800">#{ticket.id} - {ticket.descripcion}</h4>
                                <p className="text-sm text-gray-600">Estado: <strong>{ticket.estado}</strong></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    )
}

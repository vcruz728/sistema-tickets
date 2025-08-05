import { usePage } from '@inertiajs/react'
import type { PageProps } from '@/types'
import type { Ticket } from '@/types/ticket'
import { Link } from '@inertiajs/react';


export default function ListadoTickets() {
    const { tickets } = usePage<PageProps<{ tickets: Ticket[] }>>().props

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Mis Tickets</h1>
            {tickets.length === 0 ? (
                <p>No tienes tickets registrados.</p>
            ) : (
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Proceso</th>
                            <th className="p-2 border">Importancia</th>
                            <th className="p-2 border">Estado</th>
                            <th className="p-2 border">Descripción</th>
                            <th className="p-2 border">Anexos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id} className="border-t">
                                <td className="p-2 border">{ticket.id}</td>
                                <td className="p-2 border">{ticket.proceso?.nombre_proceso}</td>
                                <td className="p-2 border">{ticket.importancia?.descripcion}</td>
                                <td className="p-2 border">{ticket.estado}</td>
                                <td className="p-2 border">{ticket.descripcion}</td>
                                <td className="border px-4 py-2">
                                    {ticket.anexos.length > 0 ? (
                                        <ul className="list-disc pl-4">
                                            {ticket.anexos.map((anexo, index) => (
                                                <li key={index}>
                                                    <a
                                                        href={`/storage/${anexo.ruta_archivo}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        {anexo.nombre_archivo ?? 'Ver archivo'}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'Sin archivos'
                                    )}
                                </td>
                                <td>
                                    <Link
                                        href={route('tickets.show', ticket.id)}
                                        className="text-blue-600 underline text-sm"
                                    >
                                        Ver
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

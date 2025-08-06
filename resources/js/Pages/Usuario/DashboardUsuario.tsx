import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { PageProps } from '@/types';
import type { Ticket } from '@/types/ticket';
import Pagination from '@/Components/Pagination';

interface Props {
  tickets: {
    data: Ticket[];
    meta: any;
    links: any;
  };
  todos_tickets: Ticket[];
  filtro_actual: 'todos' | 'abierto' | 'cerrado';
}

export default function DashboardUsuario({ tickets, todos_tickets, filtro_actual }: Props) {
  const [filtro, setFiltro] = useState<'todos' | 'abierto' | 'resuelto'>(filtro_actual);
  const { user } = usePage<PageProps>().props;

  // Contadores constantes
  const total = todos_tickets.length;
  const pendientes = todos_tickets.filter(ticket => ticket.estado === 'Abierto').length;
  const resueltos = todos_tickets.filter(ticket => ticket.estado !== 'Abierto').length;

  const aplicarFiltro = (nuevoFiltro: typeof filtro) => {
    setFiltro(nuevoFiltro);
    router.get(route('dashboard'), { estado: nuevoFiltro }, { preserveScroll: true });
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Inicio</h2>}
    >
      <Head title="Inicio" />

      <div className="space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Tarjetas resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div onClick={() => aplicarFiltro('todos')} className="flex items-center justify-between p-4 rounded-lg shadow bg-blue-100 dark:bg-blue-900 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-800 transition cursor-pointer">
            <div>
              <h3 className="text-sm font-medium">Total</h3>
              <p className="text-xl font-bold">{total}</p>
            </div>
            <span className="text-4xl">📋</span>
          </div>

          <div onClick={() => aplicarFiltro('abierto')} className="flex items-center justify-between p-4 rounded-lg shadow bg-yellow-100 dark:bg-yellow-800 dark:text-white hover:bg-yellow-200 dark:hover:bg-yellow-700 transition cursor-pointer">
            <div>
              <h3 className="text-sm font-medium">Pendientes</h3>
              <p className="text-xl font-bold">{pendientes}</p>
            </div>
            <span className="text-4xl">⏳</span>
          </div>

          <div onClick={() => aplicarFiltro('resuelto')} className="flex items-center justify-between p-4 rounded-lg shadow bg-green-100 dark:bg-green-900 dark:text-white hover:bg-green-200 dark:hover:bg-green-800 transition cursor-pointer">
            <div>
              <h3 className="text-sm font-medium">Resueltos</h3>
              <p className="text-xl font-bold">{resueltos}</p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>

        {/* Encabezado del listado */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {filtro === 'todos' && 'Todos los Tickets'}
          {filtro === 'abierto' && 'Tickets Pendientes'}
          {filtro === 'resuelto' && 'Tickets Resueltos'}
        </h3>

        {/* Lista de tickets */}
        <div className="space-y-4">
          {tickets?.data?.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No hay tickets registrados.</p>
          ) : (
            tickets.data.map(ticket => (
              <a key={ticket.id} href={route('tickets.show', ticket.id)} className="block">
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <h4 className="font-bold">#{ticket.id} - {ticket.titulo ?? 'Ticket'}</h4>
                  <p>Estado: <span className="font-semibold">{ticket.estado}</span></p>
                </div>
              </a>
            ))
          )}
        </div>

      </div>

{tickets?.links && (
  <Pagination links={tickets.links} />
)}

    </AuthenticatedLayout>
  );
}

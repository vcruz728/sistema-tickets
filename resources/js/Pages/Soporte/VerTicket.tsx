import { usePage } from '@inertiajs/react';
import ModalDetalleTicketSoporte from '@/Components/ModalDetalleTicketSoporte';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import type { PageProps } from '@/types';

export default function VerTicket() {
  const { ticket, user, respuestas } = usePage<PageProps<any>>().props;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detalle del Ticket #{ticket.id}</h2>}
    >
      <Head title={`Ticket #${ticket.id}`} />

      {/* Modal centrado */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <ModalDetalleTicketSoporte
          isOpen={true}
          onClose={() => window.history.back()}
          ticket={ticket}
          respuestas={respuestas}
        />
      </div>
    </AuthenticatedLayout>
  );
}

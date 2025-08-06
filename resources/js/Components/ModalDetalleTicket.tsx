// resources/js/Components/ModalDetalleTicket.tsx

import React from 'react';
import type { Ticket } from '@/types/ticket';

interface Props {
  ticket: Ticket;
  onClose: () => void;
}

const ModalDetalleTicket: React.FC<Props> = ({ ticket, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Ticket #{ticket.id}</h2>

        <div className="space-y-2">
          <p><strong>Estado:</strong> {ticket.estado}</p>
          <p><strong>Importancia:</strong> {ticket.importancia.nombre_importancia}</p>
          <p><strong>Proceso:</strong> {ticket.proceso.nombre_proceso}</p>
          <p><strong>Fecha apertura:</strong> {ticket.fecha_apertura}</p>
          {ticket.fecha_cierre && (
            <p><strong>Fecha cierre:</strong> {ticket.fecha_cierre}</p>
          )}
          <p><strong>Descripción:</strong></p>
          <p className="bg-gray-100 p-3 rounded">{ticket.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleTicket;

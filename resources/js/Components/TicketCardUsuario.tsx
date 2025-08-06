import React from 'react';
import type { Ticket } from '@/types/ticket';

interface Props {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
}

const TicketCardUsuario: React.FC<Props> = ({ ticket, onClick }) => {
  return (
    <div
      onClick={() => onClick(ticket)}
      className="cursor-pointer bg-white dark:bg-gray-700 p-4 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    >
      <h3 className="text-lg font-semibold">
        Ticket #{ticket.id} — {ticket.proceso?.nombre_proceso}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.descripcion}</p>
      <p className="text-xs mt-2 text-gray-400">
        Estado: {ticket.estado} | Importancia: {ticket.importancia?.nombre_importancia}
      </p>
    </div>
  );
};

export default TicketCardUsuario;

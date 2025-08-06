// resources/js/Components/TicketCard.tsx

import React from 'react';
import type { Ticket } from '@/types/ticket';

interface Props {
  ticket: Ticket;
  onClick: () => void;
}

const TicketCard: React.FC<Props> = ({ ticket, onClick }) => (
  <div
    className="p-4 bg-white rounded border shadow cursor-pointer hover:bg-gray-50"
    onClick={onClick}
  >
    <p className="font-bold">#{ticket.id} - {ticket.estado}</p>
    <p>{ticket.descripcion}</p>
  </div>
);

export default TicketCard;

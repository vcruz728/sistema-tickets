import type { Ticket } from '@/types/ticket';

interface Props {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
}

const TicketCard: React.FC<Props> = ({ ticket, onClick }) => (
  <div
    onClick={() => onClick(ticket)}
    className="block cursor-pointer p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded border shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
  >
    <p className="font-bold">#{ticket.id} - {ticket.estado}</p>
    <p>{ticket.descripcion}</p>
  </div>
);

export default TicketCard;

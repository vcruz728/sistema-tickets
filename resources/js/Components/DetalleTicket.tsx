
import React from 'react';
import type { Ticket } from '@/types/ticket';

interface Props {
  ticket: Ticket;
}

const DetalleTicket: React.FC<Props> = ({ ticket }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h3 className="font-bold mb-2">Detalles del Ticket #{ticket.id}</h3>
      <p><strong>Estado:</strong> {ticket.estado}</p>
      <p><strong>Importancia:</strong> {ticket.importancia.descripcion}</p>
      <p><strong>Proceso:</strong> {ticket.proceso.nombre_proceso}</p>
      <p><strong>Fecha apertura:</strong> {ticket.fecha_apertura}</p>
      {ticket.fecha_cierre && (
        <p><strong>Fecha cierre:</strong> {ticket.fecha_cierre}</p>
      )}
      <p className="mt-2"><strong>Descripción:</strong></p>
      <p>{ticket.descripcion}</p>
    </div>
  );
};

export default DetalleTicket;

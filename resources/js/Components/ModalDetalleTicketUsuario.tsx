import React, { useState } from 'react';
import type { Ticket } from '@/types/ticket';
import ModalRespuestaTicket from './ModalRespuestaTicket';
import { Inertia } from '@inertiajs/inertia';


interface Props {
  ticket: Ticket;
  onClose: () => void;
}

const ModalDetalleTicket: React.FC<Props> = ({ ticket, onClose }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);



  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-600 text-xl"
          >
            &times;
          </button>

          <h2 className="text-xl font-bold mb-4">Ticket #{ticket.id}</h2>

          <div className="space-y-2 text-sm">
            <p><strong>Estado:</strong> {ticket.estado}</p>
            <p><strong>Importancia:</strong> {ticket.importancia?.nombre_importancia}</p>
            <p><strong>Proceso:</strong> {ticket.proceso?.nombre_proceso}</p>
            <p><strong>Fecha apertura:</strong> {ticket.fecha_apertura}</p>
            {ticket.fecha_cierre && (
              <p><strong>Fecha cierre:</strong> {ticket.fecha_cierre}</p>
            )}
            <p><strong>Descripción:</strong></p>
            <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded">{ticket.descripcion}</p>
          </div>

          {ticket.respuestas && ticket.respuestas.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Respuestas</h3>
              <ul className="space-y-2 text-sm">
                {ticket.respuestas.map((respuesta: any) => (
                  <li
                    key={respuesta.id}
                    className="p-3 rounded bg-gray-100 dark:bg-gray-700"
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {respuesta.user?.name ?? 'Soporte'} — {new Date(respuesta.created_at).toLocaleString()}
                    </div>
                    <div>{respuesta.descripcion}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ticket.estado === 'Abierto' && (
            <button
              onClick={() => setMostrarFormulario(true)}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Responder y cerrar ticket
            </button>
          )}
        </div>
      </div>

      {mostrarFormulario && (
        <ModalRespuestaTicket
          onClose={() => setMostrarFormulario(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default ModalDetalleTicket;

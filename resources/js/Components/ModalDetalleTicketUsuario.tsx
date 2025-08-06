import React from 'react';
import type { Ticket } from '@/types/ticket';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface Props {
  ticket: Ticket;
  onClose: () => void;
}

export default function ModalDetalleTicketUsuario({ ticket, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Detalles del Ticket #{ticket.id}
        </h2>

        <div className="space-y-3 text-gray-800 dark:text-gray-200">
          <p><strong>Estado:</strong> {ticket.estado}</p>
          <p><strong>Descripción:</strong> {ticket.descripcion}</p>
          <p><strong>Proceso:</strong> {ticket.proceso?.nombre_proceso}</p>
          <p><strong>Importancia:</strong> {ticket.importancia?.descripcion}</p>

          <div>
            <strong>Anexos:</strong>
            {ticket.anexos.length > 0 ? (
              <ul className="list-disc list-inside mt-1">
                {ticket.anexos.map((anexo, index) => (
                  <li key={index}>
                    <a
                      href={`http://localhost:8000/anexos/descargar/${anexo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      {anexo.nombre_archivo}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-500 dark:text-gray-400">Sin archivos adjuntos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

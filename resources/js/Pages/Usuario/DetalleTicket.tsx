import { Link, useForm } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { FormEvent } from 'react';

interface Anexo {
  id: number;
  ruta_archivo: string;
  nombre_archivo: string;
}

interface Respuesta {
  id: number;
  descripcion: string;
  tipo: string;
  usuario: {
    name: string;
  };
}

interface DetalleTicketProps extends PageProps {
  ticket: {
    id: number;
    descripcion: string;
    estado: string;
    proceso: { nombre_proceso: string };
    importancia: { descripcion: string };
    anexos: Anexo[];
    respuestas: Respuesta[];
  };
}

export default function DetalleTicket({ ticket }: DetalleTicketProps) {
  const { data, setData, post, reset, processing, errors } = useForm({
    descripcion: '',
    tipo: 'respuesta_soporte', // o 'respuesta_usuario' según tu lógica
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('tickets.respuestas.store', ticket.id), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">Detalle del Ticket #{ticket.id}</h1>

      <div className="space-y-3">
        <p><strong>Proceso:</strong> {ticket.proceso.nombre_proceso}</p>
        <p><strong>Importancia:</strong> {ticket.importancia.descripcion}</p>
        <p><strong>Estado:</strong> {ticket.estado}</p>
        <p><strong>Descripción:</strong> {ticket.descripcion}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Archivos adjuntos:</h2>
        {ticket.anexos.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {ticket.anexos.map(anexo => (
              <li key={anexo.id}>
                <a
                  className="text-blue-600 underline"
                  href={`/storage/${anexo.ruta_archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {anexo.nombre_archivo}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No se adjuntaron archivos.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-lg mb-2">Respuestas:</h2>
        {ticket.respuestas.map((respuesta) => (
          <div key={respuesta.id} className="border p-4 rounded mb-2">
            <p className="text-sm text-gray-500">
              {new Date(respuesta.created_at).toLocaleString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })} — {respuesta.tipo === 'respuesta_soporte' ? 'Soporte' : 'Usuario'}: {respuesta.user.name}
            </p>
            <p>{respuesta.descripcion}</p>
          </div>
        ))}

      </div>

      {/* Formulario para nueva respuesta */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold">Agregar una respuesta</h3>
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={data.descripcion}
          onChange={e => setData('descripcion', e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          required
        ></textarea>

        {errors.descripcion && (
          <p className="text-red-600 text-sm">{errors.descripcion}</p>
        )}

        <button type="submit" disabled={processing} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Enviar respuesta
        </button>
      </form>

      <div className="mt-8">
        <Link
          href={route('tickets.index')}
          className="text-sm text-blue-500 underline"
        >
          ← Volver al listado
        </Link>
      </div>
    </div>
  );
}

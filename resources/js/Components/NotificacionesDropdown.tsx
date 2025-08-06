import { Bell } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

interface Notification {
  id: string;
  data: {
    ticket_id: number;
    mensaje: string;
  };
  created_at: string;
}

export default function NotificacionesDropdown() {
  const { notifications = [] } = usePage().props as any;
  const [open, setOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notification[]>(notifications);

  const marcarTodasComoLeidas = () => {
    router.post('/notifications/marcar-todas', {}, {
      onSuccess: () => {
        setNotificaciones([]);
      }
    });
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="w-6 h-6 text-gray-700 dark:text-white" />
        {notificaciones.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
            {notificaciones.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 border border-gray-300 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 dark:text-white">Notificaciones</h3>
            {notificaciones.length > 0 && (
              <button
                onClick={marcarTodasComoLeidas}
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            {notificaciones.length === 0 ? (
              <div className="p-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                No hay notificaciones nuevas.
              </div>
            ) : (
              notificaciones.map((noti) => (
                <a
                  key={noti.id}
                  href={`/tickets/${noti.data.ticket_id}`}
                  className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-100"
                >
                  {noti.data.mensaje}
                  <div className="text-xs text-gray-400">{new Date(noti.created_at).toLocaleString()}</div>
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

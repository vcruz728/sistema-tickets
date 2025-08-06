import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const ModalRespuestaTicket: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [comentario, setComentario] = useState('');
  const [archivos, setArchivos] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!archivos || archivos.length === 0) {
      return setError('Debes subir al menos un archivo.');
    }
    if (archivos.length > 6) {
      return setError('Solo se permiten máximo 6 archivos.');
    }

    for (let i = 0; i < archivos.length; i++) {
      if (archivos[i].size > 1024 * 1024) {
        return setError(`El archivo "${archivos[i].name}" excede 1 MB.`);
      }
    }

    const formData = new FormData();
    formData.append('comentario', comentario);
    for (let i = 0; i < archivos.length; i++) {
      formData.append('archivos[]', archivos[i]);
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Responder y cerrar ticket</h2>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <textarea
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-700 text-sm"
          placeholder="Escribe tu respuesta aquí..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={4}
        ></textarea>

        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          onChange={(e) => setArchivos(e.target.files)}
          className="mb-4 block w-full text-sm text-gray-700 dark:text-gray-200"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Enviar respuesta y cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalRespuestaTicket;

import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import { useState } from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
    ticketId: number;
}

export default function ModalAceptarRechazar({ show, onClose, ticketId }: Props) {
    const [mostrarMotivo, setMostrarMotivo] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        tipo: '', // 'aceptado' o 'rechazado'
        motivo: '',
        archivos: [] as File[],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selected = Array.from(files).slice(0, 6);
            setData('archivos', selected);
        }
    };

    const handleSubmit = () => {
        post(route('tickets.respuesta.usuario', ticketId), {
            onSuccess: () => {
                reset();
                setMostrarMotivo(false);
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">¿Aceptas la solución del ticket?</h2>

                <div className="flex gap-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded ${data.tipo === 'aceptado' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setData('tipo', 'aceptado');
                            setMostrarMotivo(false);
                        }}
                    >
                        Aceptar
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${data.tipo === 'rechazado' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setData('tipo', 'rechazado');
                            setMostrarMotivo(true);
                        }}
                    >
                        Rechazar
                    </button>
                </div>

                {mostrarMotivo && (
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Motivo del rechazo:</label>
                        <textarea
                            value={data.motivo}
                            onChange={e => setData('motivo', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.motivo && <p className="text-red-500 text-sm">{errors.motivo}</p>}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block font-medium mb-1">Archivos (máx 6, 1MB c/u):</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        disabled={processing}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </Modal>
    );
}

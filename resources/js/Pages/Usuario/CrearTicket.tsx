import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'


export default function CrearTicket({ procesos, importancias }: any) {
    const { data, setData, post, errors, progress, reset } = useForm({
        proceso_id: '',
        importancia_id: '',
        descripcion: '',
        archivos: [] as File[],
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        post(route('tickets.store'), {
            preserveScroll: true,
            onSuccess: () => reset()
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? [])
        if (files.length > 6) {
            alert('Solo puedes subir un máximo de 6 archivos.')
            return
        }
        setData('archivos', files)
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Crear Ticket</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Proceso */}
                <label className="block mb-2">Proceso</label>
                <select
                    value={data.proceso_id}
                    onChange={e => setData('proceso_id', e.target.value)}
                    className="w-full mb-4 border rounded p-2"
                    required
                >
                    <option value="">-- Selecciona --</option>
                    {procesos.map((p: any) => (
                        <option key={p.id} value={p.id}>{p.nombre_proceso}</option>
                    ))}
                </select>

                {/* Importancia */}
                <label className="block mb-2">Importancia</label>
                <select
                    value={data.importancia_id}
                    onChange={e => setData('importancia_id', e.target.value)}
                    className="w-full mb-4 border rounded p-2"
                    required
                >
                    <option value="">-- Selecciona --</option>
                    {importancias.map((i: any) => (
                        <option key={i.id} value={i.id}>{i.descripcion}</option>
                    ))}
                </select>

                {/* Descripción */}
                <label className="block mb-2">Descripción del problema</label>
                <textarea
                    value={data.descripcion}
                    onChange={e => setData('descripcion', e.target.value)}
                    className="w-full mb-4 border rounded p-2"
                    rows={5}
                    required
                ></textarea>

                {/* Archivos */}
                <label className="block mb-2">Archivos de apoyo (máx 6, 1MB c/u)</label>
                <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="mb-4"
                />

                {/* Error messages */}
                {Object.values(errors).length > 0 && (
                    <div className="text-red-600 mb-4">
                        {Object.values(errors).map((e, i) => (
                            <div key={i}>{e as React.ReactNode}</div>
                        ))}

                    </div>
                )}

                {/* Progreso de subida (opcional) */}
                {progress && (
                    <div className="mb-4">
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    </div>
                )}

                {/* Botón de enviar */}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Enviar Ticket
                </button>
            </form>
        </div>
    )
}

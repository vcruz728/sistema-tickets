import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

interface ReporteItem {
    proceso: string;
    cantidad: number;
    promedio: number;
}

export default function ReportePromedioSistemas() {
    const { reporte } = usePage<PageProps<{ reporte: ReporteItem[] }>>().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Promedio de Respuesta por Proceso - Área de Sistemas</h2>}
        >
            <Head title="Promedio por Proceso" />

            <a
                href={route('director.reporte.promedio.pdf')}
                className="inline-block px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Descargar PDF
            </a>
            <div className="max-w-6xl mx-auto p-6">
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-indigo-600 text-white text-sm uppercase">
                            <tr>
                                <th className="px-6 py-3 text-left">Proceso</th>
                                <th className="px-6 py-3 text-left">Tickets</th>
                                <th className="px-6 py-3 text-left">Promedio (Horas)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {reporte.map((item, idx) => (
                                <tr key={idx} className="border-t">
                                    <td className="px-6 py-3 font-semibold">{item.proceso}</td>
                                    <td className="px-6 py-3">{item.cantidad}</td>
                                    <td className="px-6 py-3">{item.promedio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import type { PageProps } from '@/types';

type AreaReporte = {
    nombre: string;
    total: number;
    sin_respuesta_tiempo: number;
    respondido_tiempo: number;
    sin_respuesta_fuera_tiempo: number;
    respondido_fuera_tiempo: number;
};

export default function ReporteSemanal({ reporte }: PageProps<{ reporte: AreaReporte[] }>) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Reporte Tickets por Área</h2>}
        >
            <Head title="Reporte Tickets por Área" />
            <a
                href={route('director.reporte.pdf')}
                className="inline-block px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Descargar PDF
            </a>

            <div className="py-6 space-y-8">
                {reporte.map(area => (
                    <div key={area.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">

                        {/* Encabezado del departamento */}
                        <div className="bg-gray-100 dark:bg-gray-700 text-center py-3 rounded-t-md">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{area.nombre}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Tickets: {area.total}</p>
                        </div>

                        {/* Tabla de métricas */}
                        <table className="w-full mt-4 text-center table-fixed">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="text-yellow-600 dark:text-yellow-400 font-medium py-2">Sin respuesta en tiempo</th>
                                    <th className="text-green-600 dark:text-green-400 font-medium py-2">Se dio respuesta en tiempo</th>
                                    <th className="text-orange-600 dark:text-orange-400 font-medium py-2">Sin respuesta fuera de tiempo</th>
                                    <th className="text-red-600 dark:text-red-400 font-medium py-2">Se dio respuesta fuera de tiempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-gray-800 dark:text-gray-100">
                                    <td className="py-2">{area.sin_respuesta_tiempo}</td>
                                    <td className="py-2">{area.respondido_tiempo}</td>
                                    <td className="py-2">{area.sin_respuesta_fuera_tiempo}</td>
                                    <td className="py-2">{area.respondido_fuera_tiempo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

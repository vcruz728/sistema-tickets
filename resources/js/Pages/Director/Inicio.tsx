import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { PageProps } from '@/types';

export default function Inicio({ reporte }: { reporte: string }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Bienvenido Director</h2>}
        >
            <Head title="Inicio Director" />

            <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-200 text-lg">
                    Bienvenido al panel de dirección. Desde aquí podrás consultar los reportes semanales
                    del sistema de tickets y otros indicadores de desempeño.
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">→ Pronto agregaremos más herramientas útiles.</p>
            </div>
        </AuthenticatedLayout>
    );
}

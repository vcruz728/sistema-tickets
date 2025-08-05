import '../css/app.css';
import './bootstrap.js';

import type { AppProps } from '@inertiajs/react';
import type { Page } from '@inertiajs/core';
import type { ReactNode } from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title:string) => `${title} - ${appName}`,
    resolve: (name:string) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }: { el: Element; App: (props: AppProps) => ReactNode; props: Page }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

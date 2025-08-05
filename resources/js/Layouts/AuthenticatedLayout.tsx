import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Home, Ticket, LogOut, User, FilePlus } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="hidden sm:block fixed inset-y-0 left-0 w-64 bg-white shadow-md z-20">
                <nav className="mt-4 space-y-1 px-4">
                    <ResponsiveNavLink  href={route('dashboard')} active={route().current('dashboard')}>
                        <div className="inline-flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            <span>Inicio</span>
                        </div>
                    </ResponsiveNavLink >
                    <ResponsiveNavLink  href={route('tickets.index')} active={route().current('tickets.index')}>
                        <div className="inline-flex items-center gap-2">
                            <Ticket className="w-5 h-5" />
                            <span>Mis Tickets</span>
                        </div>
                    </ResponsiveNavLink >
                    <ResponsiveNavLink  href={route('tickets.create')} active={route().current('tickets.create')}>
                        <div className="inline-flex items-center gap-2">
                            <FilePlus className="w-5 h-5" />
                            <span>Nuevo Ticket</span>
                        </div>
                    </ResponsiveNavLink >
                    <div className="mt-6 border-t pt-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex w-full">
                                    <button
                                        type="button"
                                        className="flex w-full items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <User className="w-4 h-4" /> {user.name}
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" /> Perfil
                                    </div>
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4" /> Cerrar sesión
                                    </div>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </nav>
            </aside>

            {/* Contenido principal ajustado con padding para evitar traslapar la barra */}
            <div className="flex-1 flex flex-col sm:ml-64">
                {/* Header */}
                <header className="bg-white shadow sticky top-0 z-10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>

                {/* Navegación móvil */}
                <div className="sm:hidden border-b border-gray-200 px-4 py-2 bg-white">
                    <button
                        onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {showingNavigationDropdown && (
                        <div className="mt-2 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Inicio
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('tickets.index')} active={route().current('tickets.index')}>
                                Mis Tickets
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('tickets.create')} active={route().current('tickets.create')}>
                                Nuevo Ticket
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    )}
                </div>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
}
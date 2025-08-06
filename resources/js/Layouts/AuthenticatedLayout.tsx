import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Home, Ticket, LogOut, User, FilePlus, Moon, Sun } from 'lucide-react';
import NotificacionesDropdown from '@/Components/NotificacionesDropdown';



export default function AuthenticatedLayout({ header, children }) {

    const { notifications = [] } = usePage().props;
    const notificacionesSinLeer = notifications.length;
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    const navItemStyle = 'flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors';
    const navTextColor = 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700';

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Sidebar */}
            <aside className="hidden sm:block fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-md z-20">
                <nav className="mt-4 space-y-1 px-4">
                    {user.role?.nombre_rol?.toLowerCase() === 'usuario' && (
                        <>
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                <div className={`${navItemStyle} ${navTextColor}`}>
                                    <Home className="w-4 h-4" />
                                    <span>Inicio</span>
                                </div>
                            </ResponsiveNavLink>


                            <ResponsiveNavLink href={route('tickets.index')} active={route().current('tickets.index')}>
                                <div className={`${navItemStyle} ${navTextColor}`}>
                                    <Ticket className="w-4 h-4" />
                                    <span>Mis Tickets</span>
                                </div>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('tickets.pendientes')} active={route().current('tickets.pendientes')}>
                                <div className={`${navItemStyle} ${navTextColor}`}>
                                    <Ticket className="w-4 h-4" />
                                    <span>Tickets por aceptar</span>
                                </div>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('tickets.create')} active={route().current('tickets.create')}>
                                <div className={`${navItemStyle} ${navTextColor}`}>
                                    <FilePlus className="w-4 h-4" />
                                    <span>Nuevo Ticket</span>
                                </div>
                            </ResponsiveNavLink>
                        </>
                    )}

                    {user.role?.nombre_rol?.toLowerCase() === 'soporte' && (
                        <ResponsiveNavLink href={route('soporte.tickets.index')} active={route().current('soporte.tickets.index')}>
                            <div className={`${navItemStyle} ${navTextColor}`}>
                                <Ticket className="w-4 h-4" />
                                <span>Tickets asignados</span>
                            </div>
                        </ResponsiveNavLink>
                    )}

                    {user.role?.nombre_rol?.toLowerCase() === 'director' && (
                        <>
                            <ResponsiveNavLink href={route('director.index')} active={route().current('director.index')}>
                                <div className={`${navItemStyle} ${navTextColor}`}>
                                    <Home className="w-4 h-4" />
                                    <span>Inicio</span>
                                </div>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('director.reporte')} active={route().current('director.reporte')}>
                                <div className={`${navItemStyle} ${navTextColor}`}>
                                    <FilePlus className="w-4 h-4" />
                                    <span>Reporte Tickets por Área</span>
                                </div>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('director.promedio')} active={route().current('director.promedio')}>
                                <div className={`${navItemStyle} ${navTextColor}`}>
                                    <FilePlus className="w-4 h-4" />
                                    <span>Reporte Tiempos de Servicio Sistemas</span>
                                </div>
                            </ResponsiveNavLink>
                        </>
                    )}


                    {/* Modo obscuro */}
                    <div className="mt-6 border-t pt-4">
                        <button
                            onClick={toggleDarkMode}
                            className={`${navItemStyle} ${navTextColor} w-full`}
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            <span>{darkMode ? 'Modo claro' : 'Modo obscuro'}</span>
                        </button>
                    </div>

                    {/* Dropdown usuario */}
                    <div className="mt-6 border-t pt-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex w-full">
                                    <button
                                        type="button"
                                        className={`${navItemStyle} ${navTextColor} w-full bg-transparent`}
                                    >
                                        <User className="w-4 h-4" />
                                        {user.name}
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
                <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                        {header}

                        {/* Notificaciones */}
                        <div className="relative">
                            <NotificacionesDropdown />
                        </div>
                    </div>
                </header>


                {/* Navegación móvil */}
                <div className="sm:hidden border-b border-gray-200 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800">
                    <button
                        onClick={() => setShowingNavigationDropdown(prev => !prev)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 focus:outline-none"
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
                            {/* Navegación por rol */}
                            {user.role?.nombre_rol?.toLowerCase() === 'usuario' && (
                                <>
                                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        <div className={`${navItemStyle} ${navTextColor}`}>
                                            <Home className="w-4 h-4" />
                                            <span>Inicio</span>
                                        </div>
                                    </ResponsiveNavLink>


                                    <ResponsiveNavLink href={route('tickets.index')} active={route().current('tickets.index')}>
                                        <div className={`${navItemStyle} ${navTextColor}`}>
                                            <Ticket className="w-4 h-4" />
                                            <span>Mis Tickets</span>
                                        </div>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('tickets.pendientes')} active={route().current('tickets.pendientes')}>
                                        <div className={`${navItemStyle} ${navTextColor}`}>
                                            <Ticket className="w-4 h-4" />
                                            <span>Tickets por aceptar</span>
                                        </div>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('tickets.create')} active={route().current('tickets.create')}>
                                        <div className={`${navItemStyle} ${navTextColor}`}>
                                            <FilePlus className="w-4 h-4" />
                                            <span>Nuevo Ticket</span>
                                        </div>
                                    </ResponsiveNavLink>
                                </>
                            )}

                            {user.role?.nombre_rol?.toLowerCase() === 'soporte' && (
                                <ResponsiveNavLink href={route('soporte.tickets.index')} active={route().current('soporte.tickets.index')}>
                                    <div className={`${navItemStyle} ${navTextColor}`}>
                                        <Ticket className="w-4 h-4" />
                                        <span>Tickets asignados</span>
                                    </div>
                                </ResponsiveNavLink>
                            )}

                            {user.role?.nombre_rol?.toLowerCase() === 'director' && (
                                <>
                                    <ResponsiveNavLink href={route('director.index')} active={route().current('director.index')}>
                                        <div className={`${navItemStyle} ${navTextColor}`}>
                                            <Home className="w-4 h-4" />
                                            <span>Inicio</span>
                                        </div>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('director.reporte')} active={route().current('director.reporte')}>
                                        <div className={`${navItemStyle} ${navTextColor}`}>
                                            <FilePlus className="w-4 h-4" />
                                            <span>Reporte Tickets por Área</span>
                                        </div>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('director.promedio')} active={route().current('director.promedio')}>
                                        <div className={`${navItemStyle} ${navTextColor}`}>
                                            <FilePlus className="w-4 h-4" />
                                            <span>Reporte Tiempos de Servicio Sistemas</span>
                                        </div>
                                    </ResponsiveNavLink>
                                </>
                            )}
                            {/** Común a todos los roles: modo obscuro, perfil, logout */}
                            <button
                                onClick={toggleDarkMode}
                                className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 rounded-md"
                            >
                                <div className="flex items-center gap-2">
                                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    <span>{darkMode ? 'Modo claro' : 'Modo obscuro'}</span>
                                </div>
                            </button>

                            <ResponsiveNavLink href={route('profile.edit')}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    )}

                </div>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
}

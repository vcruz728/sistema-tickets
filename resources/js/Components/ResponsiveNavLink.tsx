import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex items-center w-full gap-2 rounded-md px-3 py-2 text-sm font-medium transition duration-150 ease-in-out focus:outline-none ${
                active
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10'
            } ${className}`}
        >
            {children}
        </Link>
    );
}

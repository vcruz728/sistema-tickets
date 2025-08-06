import React from 'react';
import { router } from '@inertiajs/react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: PaginationLink[];
  onPageChange: (url: string) => void;
}

const Pagination: React.FC<Props> = ({ links, onPageChange }) => {
  return (
    <div className="mt-6 flex justify-center space-x-1">
      {links.map((link, index) => {
        const isDisabled = link.url === null;
        const isActive = link.active;

        // Limpia etiquetas HTML del label (como "&laquo;" o "&raquo;")
        const labelText = link.label
          .replace(/&laquo;/g, '«')
          .replace(/&raquo;/g, '»')
          .replace(/<\/?[^>]+(>|$)/g, '');

        return (
          <button
            key={index}
            disabled={isDisabled}
            onClick={() => link.url && onPageChange(link.url)}
            className={`px-3 py-1 rounded text-sm border 
              ${isActive ? 'bg-blue-600 text-white font-bold' : 'bg-white text-gray-700'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
            `}
          >
            {labelText}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

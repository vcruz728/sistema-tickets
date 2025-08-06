import { router } from '@inertiajs/react';

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: Link[];
}

export default function Pagination({ links }: Props) {
  if (!links || links.length <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-1 flex-wrap">
      {links.map((link, index) => {
        const label = link.label
          .replace('&laquo;', '«')
          .replace('&raquo;', '»');

        return (
          <button
            key={index}
            dangerouslySetInnerHTML={{ __html: label }}
            disabled={!link.url}
            onClick={() => link.url && router.visit(link.url)}
            className={`px-3 py-1 border rounded ${
              link.active
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        );
      })}
    </div>
  );
}

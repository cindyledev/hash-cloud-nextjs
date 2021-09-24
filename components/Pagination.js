import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import { PER_PAGE } from '@config/index';

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <div className="relative z-0 inline-flex shadow-sm rounded-md">
      {page > 1 && (
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          <Link href={`/events?page=${page - 1}`}>
            <a>Prev</a>
          </Link>
        </button>
      )}

      {page < lastPage && (
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <span className="sr-only">Next</span>
          <Link href={`/events?page=${page + 1}`}>
            <a>Next</a>
          </Link>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

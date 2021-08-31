import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';
import { DotsVerticalIcon } from '@heroicons/react/solid';

import EventItem from '@components/EventItem';
import Layout from '@components/Layout';
import { API_URL } from '@config/index';

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      <div>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Events</h2>
          {events.length === 0 && <h3>No events to show</h3>}
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {events.map((evt) => (
              <li key={evt.key} className="col-span-1 flex shadow-sm rounded-md">
                <div>
                  <EventItem key={evt.key} evt={evt.name} />
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a
                      href={`/events/${evt.slug}`}
                      className="text-gray-900 font-medium hover:text-gray-600"
                    >
                      {evt.name}
                    </a>
                    <p className="text-gray-500">
                      {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <button
                      type="button"
                      className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Open options</span>

                      <a href={`/events/${evt.slug}`}>
                        {' '}
                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}

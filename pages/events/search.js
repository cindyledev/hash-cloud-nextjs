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
      <main>
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <Link href="/events">
              <a>{'<'} Go Back</a>
            </Link>
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                Search Results for {router.query.term}
              </h2>
            </div>

            {events.length === 0 && <h3>No events to show</h3>}
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {events.map((evt) => (
                <div key={evt.key} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={evt.imageUrl} alt="" />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        <Link href={`/events/${evt.slug}`}>
                          <a className="hover:underline">{evt.performers}</a>
                        </Link>
                      </p>
                      <Link href={`/events/${evt.slug}`}>
                        <a className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">{evt.name}</p>
                          <p className="mt-3 text-base text-gray-500">{evt.description}</p>
                        </a>
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <Link href={`/events/${evt.slug}`}>
                          <a>
                            <span className="sr-only">{evt.venue}</span>
                            <img className="h-10 w-10 rounded-full" src={evt.name} alt="" />
                          </a>
                        </Link>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <Link href={`/events/${evt.slug}`}>
                            <a className="hover:underline">{evt.address}</a>
                          </Link>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={evt.date}>
                            {new Date(evt.date).toLocaleDateString('en-US')}
                          </time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{evt.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
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

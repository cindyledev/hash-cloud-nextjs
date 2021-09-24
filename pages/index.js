import Link from 'next/link';
import { DotsVerticalIcon } from '@heroicons/react/solid';

import EventItem from '@components/EventItem';
import Layout from '@components/Layout';
import { API_URL } from '@config/index';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home({ events }) {
  return (
    <Layout>
      <main>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="mt-12 text-gray-500 text-sm font-medium uppercase tracking-wide">
            Upcoming Events
          </h2>
          {events.length === 0 && <h3>No events to show</h3>}
          <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
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

          {events.length > 0 && (
            <div className="pt-5 flex justify-center">
              <button
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <Link href="/events">
                  <a>View All Events</a>
                </Link>
              </button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

// export async function getStaticProps() {
//   // get posts from our api
//   const res = await fetch('http://localhost:1337/posts');
//   const posts = await res.json();

//   return {
//     props: { posts },
//   };
// }

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}

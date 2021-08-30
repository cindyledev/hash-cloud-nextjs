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
        <div>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Upcoming Events
          </h2>
          {events.length === 0 && <h3>No events to show</h3>}
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
            key={events.key}
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
                      {evt.date} at {evt.time}
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

          {events.length > 0 && (
            <Link href="/events">
              <a>View All Events</a>
            </Link>
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

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events: events.slice(0, 3) },
  };
}

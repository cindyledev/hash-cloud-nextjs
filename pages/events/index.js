import Link from 'next/link';

import Layout from '@components/Layout';
import Pagination from '@components/Pagination';
import { API_URL, PER_PAGE } from '@config/index';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EventsPage({ events, page, total }) {
  return (
    <Layout title="All Events">
      <main>
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                All Events
              </h2>
            </div>

            {events.length === 0 && <h3>No events to show</h3>}
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {events.map((evt) => (
                <div key={evt.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={evt.image} alt="" />
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
                            <img className="h-10 w-10 rounded-full" src={evt.image} alt="" />
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
            <div className="pt-5 flex justify-center">
              <Pagination page={page} total={total} />
            </div>
          </div>
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

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total (or count)
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}

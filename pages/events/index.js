import { DotsVerticalIcon } from '@heroicons/react/solid';

import EventItem from '@components/EventItem';
import Layout from '@components/Layout';
import Pagination from '@components/Pagination';
import { API_URL, PER_PAGE } from '@config/index';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: { name: 'Article', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

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
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus
                atque, ducimus sed.
              </p>
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
                        <a href={`/events/${evt.slug}`} className="hover:underline">
                          {evt.performers}
                        </a>
                      </p>
                      <a href={`/events/${evt.slug}`} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{evt.name}</p>
                        <p className="mt-3 text-base text-gray-500">{evt.description}</p>
                      </a>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <a href={`/events/${evt.slug}`}>
                          <span className="sr-only">{evt.venue}</span>
                          <img className="h-10 w-10 rounded-full" src={evt.name} alt="" />
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <a href={`/events/${evt.slug}`} className="hover:underline">
                            {evt.address}
                          </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={evt.date}>
                            {new Date(evt.date).toLocaleDateString('en-US')}
                          </time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{evt.time} read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination page={page} total={total} />
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

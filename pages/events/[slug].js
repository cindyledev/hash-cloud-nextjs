import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/solid';
import { ShieldCheckIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@components/Layout';
import { API_URL } from '@config/index';

const product = {
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
  imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout title={evt.name}>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Event details */}
          <div className="lg:max-w-lg lg:self-end">
            <Link href="/events">
              <a>{'<'} Go Back</a>
            </Link>
            <ToastContainer />
            <div className="mt-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {evt.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Event information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">{evt.time}</p>

                <div className="ml-4 pl-4 border-l border-gray-300">
                  <h2 className="sr-only">Date and Time</h2>
                  <div className="flex items-center">
                    <p className="ml-2 text-sm text-gray-500">
                      {new Date(evt.date).toLocaleDateString('en-US')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{evt.description}</p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
                <p className="ml-2 text-sm text-gray-500">{evt.performers}</p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Event details
              </h2>

              <form>
                <div className="mt-6 text-center">
                  <a href="#" className="group inline-flex text-base font-medium">
                    <ShieldCheckIcon
                      className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="text-gray-500 hover:text-gray-700">{evt.venue}</span>
                  </a>
                </div>
                <div className="mt-4">
                  <a
                    href="#"
                    className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
                  >
                    <span>{evt.address}</span>
                  </a>
                </div>
                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="mt-10">
                    <Link href={`/events/edit/${evt.id}`} passHref>
                      <button className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                        <a>Edit Event</a>
                      </button>
                    </Link>
                  </div>

                  <div className="mt-10">
                    <button className="w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500">
                      <a href="#" onClick={deleteEvent}>
                        Delete Event
                      </a>
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

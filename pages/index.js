import Link from 'next/link';
import { DotsVerticalIcon } from '@heroicons/react/solid';

import Layout from '@components/Layout';

const projects = [
  { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
  { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
  { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
  { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home({ posts }) {
  return (
    <Layout>
      <main>
        {/* loop over the posts and show them */}
        {posts &&
          posts.map((post) => (
            <Link href={`/${post.slug}`} key={post.id}>
              <a>
                <h2>{post.title}</h2>
                <h3>{post.user.username}</h3>
              </a>
            </Link>
          ))}

        <div>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Pinned Projects
          </h2>
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {projects.map((project) => (
              <li key={project.name} className="col-span-1 flex shadow-sm rounded-md">
                <div
                  className={classNames(
                    project.bgColor,
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                  )}
                >
                  {project.initials}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a
                      href={project.href}
                      className="text-gray-900 font-medium hover:text-gray-600"
                    >
                      {project.name}
                    </a>
                    <p className="text-gray-500">{project.members} Members</p>
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <button
                      type="button"
                      className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Open options</span>
                      <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  // get posts from our api
  const res = await fetch('http://localhost:1337/posts');
  const posts = await res.json();

  return {
    props: { posts },
  };
}

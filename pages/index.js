import Link from 'next/link'

import Layout from '../components/Layout'

export default function Home({ posts }) {
  return (
    <Layout>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {/* loop over the posts and show them */}
        {posts && posts.map((post) => (
          <Link href={`/${post.slug}`} key={post.id}>
            <a>
              <h2>{post.title}</h2>
              <h3>{post.user.username}</h3>
            </a>
          </Link>
        ))}

      </main>

    </Layout>
  )
}

export async function getStaticProps() {
  // get posts from our api
  const res = await fetch("http://localhost:1337/posts");
  const posts = await res.json();

  return {
    props: { posts }
  }
}
import Link from 'next/link'

import Layout from '../components/Layout'
import styles from '../styles/Layout.module.css'

export default function Home({ posts }) {
  return (
    <Layout className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
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
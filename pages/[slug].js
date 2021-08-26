export default function Post({ post }) {
  return (
    <div>{post.title}s</div>
  )
}

// tell next.js how many pages there are
export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/posts")
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch (`http://localhost:1337/posts?slug=${slug}`)
  const data = await res.json();
  const post = data[0]

  return {
    props: { post }
  }
}
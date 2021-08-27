import Head from 'next/head';

import Footer from './Footer';
import Header from './Header';

export default function Layout({ title, keyword, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keyword: 'music, dj, edm, events',
};

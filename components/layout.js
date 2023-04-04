import React from 'react';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import { Header } from './header';
import { Footer } from './footer';

//For custom overwrites via the MDX plugin / provider
const components = {};

const headerURLs = [
  { text: 'home',
    url: '/'
  },
  { text: 'episodes',
    url: '/episodes'
  },
  { text: 'merch',
    url: '/merch'
  },
  { text: 'blog',
    url: '/blog'
  },
  { text: 'contact',
    url: '/contact'
  }
]


export default function Blog(props) {
  const { meta, route, ...rest } = props;

  console.log('props',props);

    return function Layout({ children }) {
      return (
        <>
          <Head>
            <meta property="og:title" content={meta.title} />
            <meta property="og:site_name" content="VT2U - Adventures in Vermont and Beyond" />
            <meta property="og:description" content={meta.description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@vermont2u" />
            <meta property="og:image" content={meta.og} />
          </Head>
          <Header/>
          <div className="prose lg:prose-lg mx-auto px-4 py-8">
            <MDXProvider components={components}>{children}</MDXProvider>
          </div>
          <Footer/>
        </>
      );
    };

}

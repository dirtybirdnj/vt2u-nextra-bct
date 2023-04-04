import Link from 'next/link';
export function Header() {

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


  return (
    <>
    <div className="flex items-center justify-between max-w-3xl px-8 mx-auto py-4">
      <Link href="/">
        <a className="block font-bold text-lg">vt2u.com</a>
      </Link>
      <a target="_blank" href="https://www.instagram.com/vermont2u/" rel="noopener">
        Follow Me
      </a>
    </div>
    <div className="flex items-center justify-between max-w-3xl px-8 mx-auto py-4">
      <ul>
        {
          headerURLs.map((link) => {
          console.log(link)
            return <p><Link key={link.text} href={link.url}>{link.text}</Link></p>}
          )
        }
      </ul>
    </div>
    </>
  );
}

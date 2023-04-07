import Link from 'next/link';
import navLinks from '../navLinks'
export function Footer() {

  return <>
  <div className="flex items-center justify-between max-w-3xl px-8 mx-auto py-4 border-t-2">
  <h3>Footer</h3>
    <Link href="/" className="block font-bold text-lg">
    vt2u.com
    </Link>
    <a target="_blank" href="https://www.instagram.com/vermont2u/" rel="noopener">
      Follow Me
    </a>
  </div>
  <div>
    <ul className="flex items-center justify-between max-w-3xl px-8 mx-auto py-4">
      {
        navLinks.map((link) => {
          return <p key={link.text}><Link key={link.text} href={link.url} legacyBehavior>{link.text}</Link></p>;}
        )
      }
    </ul>
  </div>
  </>;
}

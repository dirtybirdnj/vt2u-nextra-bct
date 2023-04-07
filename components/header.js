import Link from 'next/link';
import Image from 'next/image';
import navLinks from '../navLinks'
import vt2uLogo from '../public/vt2u-roadsign-2023.svg';
import { BsFacebook, BsInstagram } from 'react-icons/bs';


export function Header() {

  return <>
  <div className="flex items-center justify-between max-w-3xl px-8 mx-auto py-4 border-b-2">
    <Link href="/">
      <Image className="object-scale-down" src={vt2uLogo} style={{ width: '100px'}}/>
      <p className="text-base">Adventures in and around Vermont, to you!</p>
    </Link>
    <div>
      <span className="flex items-center space-x-5">
        <Link href="https://www.facebook.com/vermont2u" target="_blank"><BsFacebook/></Link>
        <Link href="https://www.instagram.com/vermont2u" target="_blank"><BsInstagram/></Link>
      </span>
    </div>
  </div>

  <ul className="flex items-center justify-between max-w-3xl px-8 mx-auto py-4">
    {
      navLinks.map((link) => {
          return <p key={link.text} ><Link href={link.url} legacyBehavior>{link.text}</Link></p>;
        }
      )
    }
  </ul>

  </>;
}

import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold">
      <Image src={`/blazar-logo.png`} alt={'Blazar Labs'} width="200" height="25" />
    </Link>
  )
}

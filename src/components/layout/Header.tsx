'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'

export default function HeaderLayout() {
  const pathname = usePathname()

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Clients', href: '/clients' }
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="__header flex justify-between items-center">
      <Logo />
      <nav>
        <ul className="flex gap-4">
          {menuItems.map(({ name, href }) => (
            <li key={href}>
              <Link href={href} className={isActive(href) ? '__active' : ''}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

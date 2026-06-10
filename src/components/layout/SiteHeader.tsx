'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/#templates', label: 'قالب‌ها' },
  { href: '/#about', label: 'درباره محصول' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-lg"
        >
          لحظه‌ساز <span className="text-violet-300">✨</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:px-4',
                isHome && 'scroll-smooth',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

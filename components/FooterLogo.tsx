'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';

export function FooterLogo() {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  };

  return (
    <Link className="font-['Playfair_Display'] text-[22px] font-bold" href="/" onClick={handleClick} aria-label="Voltar ao início">
      <Image src="/assets/Logo-escuro.png" alt="Logo da Dra. Geanne Lopes" width={260} height={260} className="h-auto w-50 lg:w-50" />
    </Link>
  );
}

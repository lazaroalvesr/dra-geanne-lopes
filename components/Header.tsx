'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type MouseEvent, useEffect, useRef, useState } from 'react';

const links = [
  ['Início', '#inicio'],
  ['Sobre', '#sobre'],
  ['Atuação', '#atuacao'],
  ['Blog', '#blog'],
  ['Contato', '#contato'],
];

const MENU_ANIMATION_DURATION = 360;

export function Header() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#inicio');
  const navigationTargetRef = useRef<string | null>(null);
  const navigationTimeoutRef = useRef<number | undefined>(undefined);
  const menuCloseTimeoutRef = useRef<number | undefined>(undefined);
  const lockedScrollPositionRef = useRef(0);

  useEffect(() => {
    const updateHeader = () => {
      setScrolled(window.scrollY > 32);

      const navigationTarget = navigationTargetRef.current;
      if (navigationTarget) {
        const targetSection = document.querySelector(navigationTarget);
        const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 80;
        const targetReached = targetSection && Math.abs(targetSection.getBoundingClientRect().top - headerHeight - 12) <= 4;

        if (!targetReached) return;
        navigationTargetRef.current = null;
      }

      const referencePoint = window.innerHeight * 0.35;
      let currentHref = '#inicio';

      for (const [, href] of links) {
        const section = document.querySelector(href);
        if (section && section.getBoundingClientRect().top <= referencePoint) {
          currentHref = href;
        }
      }

      setActiveHref((current) => current === currentHref ? current : currentHref);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousDocumentOverflowX = document.documentElement.style.overflowX;

    if (!open) return;

    lockedScrollPositionRef.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollPositionRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      document.documentElement.style.overflowX = previousDocumentOverflowX;
      window.scrollTo(0, lockedScrollPositionRef.current);
    };
  }, [open]);

  useEffect(() => () => {
    if (navigationTimeoutRef.current !== undefined) {
      window.clearTimeout(navigationTimeoutRef.current);
    }
    if (menuCloseTimeoutRef.current !== undefined) {
      window.clearTimeout(menuCloseTimeoutRef.current);
    }
  }, []);

  const closeMenu = (onClosed?: () => void) => {
    if (!open || isClosing) return;

    setIsClosing(true);
    menuCloseTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
      if (onClosed) window.requestAnimationFrame(onClosed);
    }, MENU_ANIMATION_DURATION);
  };

  const toggleMenu = () => {
    if (open) {
      closeMenu();
      return;
    }

    setIsClosing(false);
    setOpen(true);
  };
  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setActiveHref(href);
    navigationTargetRef.current = href;

    if (navigationTimeoutRef.current !== undefined) {
      window.clearTimeout(navigationTimeoutRef.current);
    }

    const scrollToSection = () => {
      const section = document.querySelector<HTMLElement>(href);
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 80;

      if (section) {
        const sectionPaddingTop = href === '#inicio'
          ? 0
          : Number.parseFloat(window.getComputedStyle(section).paddingTop) || 0;

        window.scrollTo({
          top: Math.max(0, section.getBoundingClientRect().top + window.scrollY + sectionPaddingTop - headerHeight - 24),
          behavior: 'smooth',
        });
      }

      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      navigationTimeoutRef.current = window.setTimeout(() => {
        navigationTargetRef.current = null;
        window.dispatchEvent(new Event('scroll'));
      }, 2000);
    };

    if (open) {
      closeMenu(scrollToSection);
      return;
    }

    scrollToSection();
  };

  return (
    <>
    <header className={`${open ? 'fixed inset-x-0 top-0' : 'sticky top-0'} z-30 flex items-center justify-between bg-[#F3F3F3f5] backdrop-blur-xl transition-[height,width,margin,padding,border-radius,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${scrolled ? 'h-16 border-t-4 border-[#0A2723] px-5 md:h-17 md:px-[6vw] xl:h-21 xl:top-4 xl:mx-auto xl:w-[min(1700px,90vw)] xl:rounded-[13px] xl:px-[clamp(28px,3vw,52px)] xl:shadow-[0_14px_30px_rgba(21,41,66,.14)]' : 'h-19 border-b border-[#D1AD7D66] px-5.5 md:h-21 md:px-[6vw]'}`}>
      <Link className="flex items-center gap-2 whitespace-nowrap md:gap-3.25" href="#inicio" aria-label="Dra. Geanne Lopes - Início" onClick={(event) => handleNavigation(event, '#inicio')}>
        <Image
          src="/assets/Logo-dra.png"
          alt='Logo da Dra Geanne Lope'
          width={260}
          height={260}
          className={`h-auto w-50 origin-left transition-transform duration-300 xl:w-65 ${scrolled ? 'scale-90 xl:scale-100' : 'scale-100'}`}
        />
      </Link>
      <button className="relative z-40 flex h-11 w-11 items-center justify-center p-0 xl:hidden" aria-expanded={open} aria-controls="main-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={toggleMenu}>
        {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
      </button>
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => closeMenu()}
          className={`absolute inset-x-0 top-full z-20 bg-black/60 xl:hidden ${isClosing ? 'animate-[overlay-fade-out_.36s_ease_forwards]' : 'animate-[overlay-fade-in_.24s_ease-out_forwards]'} ${scrolled ? 'h-[calc(100dvh-64px)] md:h-[calc(100dvh-68px)]' : 'h-[calc(100dvh-76px)] md:h-[calc(100dvh-84px)]'}`}
        />
      )}
      <nav id="main-menu" className={`${open ? `absolute right-0 top-full z-30 flex w-4/5 flex-col gap-6 bg-[#F3F3F3] px-7.5 pb-7 pt-9 shadow-[-16px_18px_34px_rgba(21,41,66,.13)] ${isClosing ? 'animate-[menu-slide-out_.36s_cubic-bezier(.2,.75,.25,1)_forwards]' : 'animate-[menu-slide-in_.36s_cubic-bezier(.2,.75,.25,1)_forwards]'} ${scrolled ? 'h-[calc(100dvh-64px)] md:h-[calc(100dvh-68px)]' : 'h-[calc(100dvh-76px)] md:h-[calc(100dvh-84px)]'}` : 'hidden'} xl:static xl:flex xl:h-auto xl:w-auto xl:flex-row xl:items-center xl:gap-8.75 xl:bg-transparent xl:p-0 xl:shadow-none`}>
        {links.map(([label, href]) => <Link className={`relative flex min-h-11 items-center py-2 text-[16px] text-[#0A2723] transition-colors duration-300 xl:min-h-0 xl:text-[15px] xl:after:absolute xl:after:bottom-0 xl:after:left-0 xl:after:h-px xl:after:w-full xl:after:origin-left xl:after:scale-x-0 xl:after:bg-[#D1AD7D] xl:after:transition-transform xl:after:duration-300 xl:after:ease-out ${activeHref === href ? 'text-[#D1AD7D] xl:after:scale-x-100' : ''}`} href={href} key={href} onClick={(event) => handleNavigation(event, href)}>{label}</Link>)}
        <Link className="mt-auto flex w-full items-center justify-center gap-3 rounded-lg bg-[#0A2723] px-5 py-4 text-[15px] font-semibold text-white xl:hidden" href="#contato" onClick={(event) => handleNavigation(event, '#contato')}>Agendar consulta <ArrowUpRight size={20} /></Link>
      </nav>
      <Link className="hidden items-center justify-center gap-5 rounded-lg bg-[#0A2723] px-4.75 py-3 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123A34] xl:flex" href="#contato" onClick={(event) => handleNavigation(event, '#contato')}>Agendar consulta <ArrowUpRight size={20} /> </Link>
    </header>
    {open && <div aria-hidden="true" className={scrolled ? 'h-16 md:h-17' : 'h-19 md:h-21'} />}
    </>
  );
}

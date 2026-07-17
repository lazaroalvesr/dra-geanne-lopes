'use client';

import { useEffect } from 'react';

export function ClientEffects() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section.reveal-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleSmoothScroll = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[data-smooth-scroll]');
      const href = link?.getAttribute('href');
      if (!href?.startsWith('#')) return;

      const section = document.querySelector<HTMLElement>(href);
      if (!section) return;

      event.preventDefault();
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 80;
      window.scrollTo({
        top: Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerHeight - 12),
        behavior: 'smooth',
      });
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return null;
}

import { AtSign, Music2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { contactDetails, primaryOffice } from '../app/site-config';
import { CurrentYear } from './CurrentYear';

const officeLabel = `${primaryOffice.city} – ${primaryOffice.state}`;

export function Footer() {
  return (
    <footer className="flex flex-col items-start gap-5 bg-[#0A2723] px-5.5 py-7.5 text-white md:flex-row md:items-center md:justify-between md:px-[max(6vw,40px)] md:py-9.25">
      <Link className="font-['Playfair_Display'] text-[22px] font-bold" href="/">
        <Image src="/assets/Logo-escuro.png" alt="Logo da Dra. Geanne Lopes" width={260} height={260} className="h-auto w-50 lg:w-50" />
      </Link>
      <p className="m-0 text-[11px] leading-[1.6] text-[#cfd7df]">© <CurrentYear initialYear={new Date().getFullYear()} /> Dra. Geanne Lopes — Advocacia e Consultoria. Todos os direitos reservados.<br />{officeLabel} • Atendimento presencial e on-line.</p>
      <p className="m-0 text-[11px] text-[#cfd7df]">{contactDetails.oab}</p>
      <Link className="inline-flex items-center gap-1.5 text-[11px] text-[#cfd7df] transition hover:text-[#D1AD7D]" href="https://www.instagram.com/geanne_lopes/" target="_blank" rel="noreferrer"><AtSign size={14} /> Instagram</Link>
      <Link className="inline-flex items-center gap-1.5 text-[11px] text-[#cfd7df] transition hover:text-[#D1AD7D]" href="https://www.tiktok.com/@geanne_lopes" target="_blank" rel="noreferrer"><Music2 size={14} /> TikTok</Link>
      <p className="m-0 text-[11px] text-[#cfd7df]">Desenvolvido por <Link href="https://www.lazaroalvesr.com/" target="_blank" rel="noreferrer">Lázaro Alves R</Link></p>
    </footer>
  );
}

import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { contactDetails, primaryOffice } from '../app/site-config';

const officeLabel = `${primaryOffice.city} – ${primaryOffice.state}`;

export function HeroSection() {
  return (
    <section id="inicio" className="reveal-section relative flex min-h-155 flex-col overflow-hidden bg-[linear-gradient(120deg,rgba(224,200,160,0.42),rgba(243,243,243,0.92)_70%)] px-5.5 py-17.5 md:h-auto md:min-h-0 md:px-[max(6vw,40px)] md:py-16 lg:h-162.5 lg:min-h-[calc(100vh-84px)] lg:flex-row">
      <div className="absolute -right-30 -top-62.5 h-170 w-170 rounded-full border border-[#D1AD7D5e] shadow-[0_0_0_65px_rgba(230,216,210,.32),0_0_0_130px_rgba(230,216,210,.25)]" />
      <div className="reveal-item relative z-10 max-w-200 lg:max-w-[calc(100%-470px)]">
        <p className="mb-6.25 text-[11px] font-semibold tracking-[1.4px] text-[#D1AD7D]">ADVOCACIA COM PROPÓSITO</p>
        <h1 className="mb-6.75 max-w-205 font-['Playfair_Display'] text-[49px] leading-[1.05] tracking-[-2px] text-[#0A2723] md:text-[clamp(50px,5.7vw,88px)]">Clareza jurídica para decisões <em className="font-medium text-[#D1AD7D] not-italic md:italic">importantes.</em></h1>
        <p className="max-w-140 text-[16px] leading-[1.65] text-[#0A2723] md:text-[18px]">Atendimento próximo, responsável e estratégico para proteger o que realmente importa para você.</p>
        <div className="mt-8.5 flex w-full flex-col items-start gap-5.5 md:flex-row md:items-center md:gap-7.5">
          <Link className="inline-flex w-full items-center justify-center gap-5 rounded-lg bg-[#0A2723] px-5.25 py-4 text-[14px] font-semibold text-[#F6EECF] transition hover:-translate-y-0.5 hover:bg-[#123A34] md:w-auto md:min-w-63" href={`https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(contactDetails.whatsappMessage)}`} target="_blank" rel="noreferrer">Falar com a Dra. Geanne <span>→</span></Link>
          <Link className="group inline-flex w-full items-center justify-center gap-3 rounded-lg border border-[#0A2723] bg-[#F3F3F359] px-4.5 py-3.75 text-[14px] font-semibold text-[#0A2723] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0A2723] hover:text-white md:w-auto md:min-w-58" href="#atuacao" data-smooth-scroll>Conheça as áreas de atuação <ArrowDown color="#AA7B39" size={20} /></Link>
        </div>
        <div className="mt-6.75 flex items-center gap-3 text-[#0A2723] md:mt-8.5 md:gap-4.5"><span className="flex min-w-0 flex-col gap-1"><strong className="text-[10px] tracking-[.25px] md:text-[11px]">{contactDetails.oab}</strong><small className="text-[9px] text-[#65706D] md:text-[10px]">Inscrição profissional</small></span><i className="h-6.75 w-px shrink-0 bg-[#0A272340]" /><span className="flex min-w-0 flex-col gap-1"><strong className="text-[10px] tracking-[.25px] md:text-[11px]">Atendimento em {officeLabel}</strong><small className="text-[9px] text-[#65706D] md:text-[10px]">Presencial e on-line</small></span></div>
      </div>
      <div className="reveal-item reveal-delay-2 relative z-10 mx-auto mt-11.25 h-121.25 w-[min(340px,88vw)] self-center overflow-hidden rounded-t-[150px] bg-[#E0C8A0]/35 md:hidden lg:absolute lg:bottom-0 lg:right-[6vw] lg:mx-0 lg:mt-0 lg:flex lg:h-146.25 lg:w-100">
        <Image src="/assets/dra-geanne-hero.jpg" alt="Dra. Geanne Lopes" fill priority sizes="(max-width: 1023px) 340px, 400px" className="object-cover object-top" />
        <div className="absolute -left-2 bottom-7 w-59 border-l-[3px] border-[#D1AD7D] bg-[#F3F3F3fc] px-4.75 py-4.25 shadow-[0_17px_33px_rgba(21,41,66,.22)]"><span className="block text-[9px] font-bold tracking-[1.1px] text-[#D1AD7D]">ATENDIMENTO</span><strong className="my-2 block font-['Playfair_Display'] text-[19px] leading-[1.12] text-[#0A2723]">Presencial e on-line</strong><small className="text-[11px] font-bold tracking-[.5px] text-[#65706D]">Advocacia Previdenciária</small></div>
      </div>
    </section>
  );
}

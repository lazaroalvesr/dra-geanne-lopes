import Image from 'next/image';
import Link from 'next/link';

export function AboutSection() {
  return (
    <section id="sobre" className="reveal-section grid bg-[#F3F3F3] px-6 pb-20 md:grid-cols-[.9fr_1.1fr] md:items-center md:gap-[clamp(70px,10vw,160px)] md:px-[max(5vw,55px)] md:py-27">
      <div className="reveal-item relative order-2 flex min-h-90 items-end overflow-hidden rounded-2xl bg-[#0A2723] p-7 text-white md:order-0 md:min-h-135 md:p-10.5">
        <Image src="/assets/dra-geanne-about.jpg" alt="Dra. Geanne Lopes em seu escritório" fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover object-[center_36%]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(10,39,35,.75))]" />
        <p className="relative z-10 rounded-md bg-[#0A2723]/80 px-4 py-3 text-[11px] font-semibold leading-[1.7] tracking-[2px] shadow-[0_8px_20px_rgba(10,39,35,.22)] backdrop-blur-sm">ADVOCACIA<br />PREVIDENCIÁRIA</p>
      </div>
      <div className="reveal-item reveal-delay-2 order-1 max-w-280 md:order-0">
        <p className="mb-7 pt-8 text-[10px] font-semibold tracking-[1.7px] text-[#D1AD7D] md:text-[13px] lg:pt-0">SOBRE A ADVOGADA</p>
        <h2 className="mb-7 max-w-265 font-['Playfair_Display'] text-[33px] leading-[1.08] tracking-[-1.4px] text-[#0A2723] md:mb-10 md:text-[clamp(42px,3.8vw,64px)]">Escuta atenta. Orientação segura. <em className="font-medium text-[#D1AD7D]">Soluções reais.</em></h2>
        <div className="max-w-190 space-y-5 font-['Playfair_Display'] text-[16px] leading-[1.55] text-[#0A2723] md:text-[19px] md:leading-[1.55]">
          <p>Advogada previdenciária desde 2012, a Dra. Geanne Lopes mantém escritório em Taiobeiras/MG e atua em requerimentos administrativos, recursos, revisões e processos judiciais em face do INSS. É Mestre em Administração Pública pela UFVJM e especialista em Direito Previdenciário, Direito e Processo Civil e Advocacia Cível.</p>
          <p>Também construiu trajetória na docência, com atuação como professora universitária na Faculdade de Direito de Taiobeiras – FAC-TAIÔ. Atualmente, é Presidente da 146ª Subseção da OAB Taiobeiras, no triênio 2025–2027.</p>
        </div>
        <Link className="mt-7 inline-flex items-center gap-3 border-b border-[#D1AD7D] pb-2 text-[14px] font-semibold text-[#D1AD7D] transition-colors hover:text-[#0A2723] md:mt-10 md:text-[17px]" href="#atuacao" data-smooth-scroll>Conheça minha atuação <span>→</span></Link>
      </div>
    </section>
  );
}

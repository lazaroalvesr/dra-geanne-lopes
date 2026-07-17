import Link from 'next/link';

export function AboutSection() {
  return (
    <section id="sobre" className="reveal-section grid bg-[#F3F3F3] px-6 py-20 md:grid-cols-[.9fr_1.1fr] md:items-center md:gap-[clamp(70px,10vw,160px)] md:px-[max(5vw,55px)] md:py-27">
      <div className="reveal-item relative flex min-h-90 items-end overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#314057,#10243b_58%,#ba8c50)] p-7 text-white md:min-h-135 md:p-10.5">
        <div className="absolute -right-37.5 -top-40 h-120 w-120 rounded-full border border-white/35" />
        <div className="absolute -bottom-35 -left-20 h-70 w-70 rounded-full border border-white/35" />
        <div className="absolute right-10.5 top-11.25 font-['Playfair_Display'] text-[230px] leading-none text-white/10">G</div>
        <p className="relative z-10 text-[11px] font-semibold leading-[1.7] tracking-[2px]">ADVOCACIA<br />ESTRATÉGICA</p>
      </div>
      <div className="reveal-item reveal-delay-2 max-w-280">
        <p className="mb-7 pt-8 text-[10px] font-semibold tracking-[1.7px] text-[#D1AD7D] md:text-[13px] lg:pt-0">SOBRE A ADVOGADA</p>
        <h2 className="mb-7 max-w-265 font-['Playfair_Display'] text-[33px] leading-[1.08] tracking-[-1.4px] text-[#0A2723] md:mb-10 md:text-[clamp(42px,3.8vw,64px)]">Escuta atenta. Orientação segura. <em className="font-medium text-[#D1AD7D]">Soluções reais.</em></h2>
        <div className="max-w-190 space-y-5 font-['Playfair_Display'] text-[16px] leading-[1.55] text-[#0A2723] md:text-[19px] md:leading-[1.55]">
          <p>Com uma atuação pautada em ética, transparência e técnica, a Dra. Geanne oferece uma advocacia que traduz o universo jurídico em caminhos claros e seguros.</p>
          <p>Cada demanda é recebida com cuidado e tratada de forma individual, para que você tenha confiança em cada próximo passo.</p>
        </div>
        <Link className="mt-7 inline-flex items-center gap-3 border-b border-[#D1AD7D] pb-2 text-[14px] font-semibold text-[#D1AD7D] transition-colors hover:text-[#0A2723] md:mt-10 md:text-[17px]" href="#atuacao" data-smooth-scroll>Conheça minha atuação <span>→</span></Link>
      </div>
    </section>
  );
}

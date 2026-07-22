import Link from 'next/link';
import { practiceAreas } from '../data/practice-areas';

export function PracticeAreasSection() {
  return (
    <section id="atuacao" className="reveal-section bg-[#0A2723] px-5.5 py-20 text-[#f7f4ee] md:px-[max(6vw,40px)] md:py-30">
      <div className="reveal-item mb-13.5 flex flex-col gap-5.5 md:flex-row md:items-end md:justify-between"><div><p className="mb-6.25 text-[11px] font-semibold tracking-[1.4px] text-[#D1AD7D]">ÁREAS DE ATUAÇÃO</p><h2 className="max-w-175 font-['Playfair_Display'] text-[40px] leading-[1.12] tracking-[-1.6px] md:text-[clamp(36px,4vw,57px)]">Atuação jurídica com técnica e <em className="font-medium text-[#D1AD7D]">sensibilidade.</em></h2></div><p className="max-w-77.5 text-[15px] leading-[1.7] text-[#E0C8A0]">Orientação completa, com comunicação simples e foco na melhor estratégia para o seu caso.</p></div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3">
        {practiceAreas.map((area, index) => (
          <article key={area.title} className={`reveal-item reveal-delay-${index + 1} flex min-h-65 cursor-pointer flex-col justify-between border border-white/20 p-6.75 md:min-h-78.75 ${area.featured ? 'bg-[#D1AD7D]' : 'transition hover:bg-[#123A34]'}`}>
            <span className="self-end text-[12px] text-white/65">{area.number}</span>
            <div><span className={`mb-10 block text-[28px] ${area.featured ? 'text-[#0A2723]' : 'text-[#D1AD7D]'}`}>{area.symbol}</span><h3 className="mb-3.5 font-['Playfair_Display'] text-[25px] leading-[1.15]">{area.title}</h3><p className={`max-w-75 text-[14px] leading-[1.6] ${area.featured ? 'text-white' : 'text-[#F3F3F3]'}`}>{area.description}</p></div>
            <Link className="self-end text-2xl" href="#contato" aria-label={`Saber mais sobre ${area.title}`}>↗</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { testimonials } from '../data/testimonials';

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const show = (index: number) => setCurrent((index + total) % total);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((item) => (item + 1) % total), 6000);
    return () => window.clearInterval(timer);
  }, [total]);

  const item = testimonials[current];
  return (
    <section className="reveal-section grid gap-8 bg-[#F3F3F3] px-[max(6vw,40px)] py-30 md:grid-cols-[.75fr_1.25fr] md:gap-25">
      <div className="reveal-item">
        <p className="mb-6.25 text-[11px] font-semibold tracking-[1.4px] text-[#D1AD7D]">DEPOIMENTOS</p>
        <h2 className="mb-8 font-['Playfair_Display'] text-[43px] leading-[1.12] tracking-[-1.6px] text-[#0A2723]"><span>Relações construídas com </span><em className="font-medium text-[#D1AD7D]">confiança.</em></h2>
        <div className="mt-12 flex gap-2.5">
          <button className="grid h-11 w-11 cursor-pointer place-items-center border border-[#0A272329] text-lg transition hover:border-[#0A2723] hover:bg-[#0A2723] hover:text-white" type="button" onClick={() => show(current - 1)} aria-label="Depoimento anterior">←</button>
          <button className="grid h-11 w-11 cursor-pointer place-items-center border border-[#0A272329] text-lg transition hover:border-[#0A2723] hover:bg-[#0A2723] hover:text-white" type="button" onClick={() => show(current + 1)} aria-label="Próximo depoimento">→</button>
        </div>
      </div>
      <div className="reveal-item reveal-delay-2 self-center" aria-live="polite">
        <figure className="animate-[testimonial-enter_.55s_cubic-bezier(.2,.7,.2,1)] border-l border-[#D1AD7D] pl-7 motion-reduce:animate-none md:pl-15" key={item.name}>
          <blockquote className="mb-9.5 font-['Playfair_Display'] text-[29px] font-medium leading-[1.32] tracking-[-.8px] text-[#0A2723] md:text-[clamp(27px,3vw,42px)]">{item.quote}</blockquote>
          <figcaption className="flex flex-col gap-1 text-[13px] text-[#0A2723]"><strong>{item.name}</strong><span className="text-[#D1AD7D]">{item.role}</span></figcaption>
        </figure>
        <div className="ml-7 mt-8.5 flex items-center gap-2.25 md:ml-15" aria-label="Paginação dos depoimentos">
          {testimonials.map((testimonial, index) => (
            <button className={`relative h-0.75 cursor-pointer overflow-hidden p-0 transition ${index === current ? 'w-10.5 bg-[#E0C8A0]' : 'w-5.5 bg-[#E0C8A0] hover:bg-[#D1AD7D]'}`} type="button" aria-label={`Ver depoimento ${index + 1}`} onClick={() => show(index)} key={testimonial.name}>
              {index === current && <span key={current} className="absolute inset-y-0 left-0 animate-[testimonial-progress_6s_linear_forwards] bg-[#D1AD7D] motion-reduce:w-full motion-reduce:animate-none" />}
            </button>
          ))}
          <span className="ml-3 text-[11px] font-bold tracking-[1px] text-[#D1AD7D]">{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}

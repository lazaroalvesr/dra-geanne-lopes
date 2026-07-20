import Image from 'next/image';
import Link from 'next/link';
import { contactDetails } from '../app/site-config';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section id="contato" className="reveal-section grid gap-14 bg-[#E0C8A073] px-5.5 py-20 md:grid-cols-2 md:gap-[clamp(60px,10vw,150px)] md:px-[max(6vw,40px)] md:py-30">
      <div className="reveal-item">
        <p className="mb-6.25 text-[11px] font-semibold tracking-[1.4px] text-[#D1AD7D]">VAMOS CONVERSAR?</p><h2 className="mb-8 font-['Playfair_Display'] text-[40px] leading-[1.12] tracking-[-1.6px] text-[#0A2723] md:text-[clamp(36px,4vw,57px)]">Seu caso merece uma orientação <em className="font-medium text-[#D1AD7D]">cuidadosa.</em></h2><p className="max-w-107.5 font-['Playfair_Display'] text-[18px] leading-[1.65] text-[#0A2723]">Preencha o formulário ou chame no WhatsApp. Retornaremos o mais breve possível.</p>
        <Link className="mt-4.5 inline-flex items-center gap-2.5 text-[14px] font-bold text-[#0A2723]" href={`https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(contactDetails.whatsappMessage)}`} target="_blank" rel="noreferrer"><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#D1AD7D] bg-[#0A2723] p-1"><Image src="/assets/Whataspp-icon.png" alt="" width={22} height={22} /></span> Falar pelo WhatsApp</Link>
        <div className="mt-9.5 grid max-w-115 gap-4.25 border-t border-[#0A272333] pt-6.75 text-[#0A2723]"><div className="grid gap-1 md:grid-cols-[145px_1fr] md:gap-3"><span className="text-[10px] font-bold tracking-[1px] text-[#D1AD7D]">TELEFONE</span><Link className="text-[13px]" href={`tel:${contactDetails.phoneE164}`}>{contactDetails.phoneDisplay}</Link></div><div className="grid gap-1 md:grid-cols-[145px_1fr] md:gap-3"><span className="text-[10px] font-bold tracking-[1px] text-[#D1AD7D]">E-MAIL</span><Link className="text-[13px]" href="mailto:contato@drageannelopes.com.br">contato@drageannelopes.com.br</Link></div><div className="grid gap-1 md:grid-cols-[145px_1fr] md:gap-3"><span className="text-[10px] font-bold tracking-[1px] text-[#D1AD7D]">ESCRITÓRIO CENTRAL</span><p className="m-0 text-[13px]">{contactDetails.address}</p></div></div>
      </div>
      <div className="reveal-item reveal-delay-2"><ContactForm /></div>
    </section>
  );
}

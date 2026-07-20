'use client';

import { ChevronDown } from 'lucide-react';
import { FormEvent, InvalidEvent, useEffect, useRef, useState } from 'react';
import { contactDetails } from '../app/site-config';
import { contactServiceOptions } from '../data/practice-areas';

const messages: Record<string, string> = {
  nome: 'Por favor, informe seu nome completo.',
  telefone: 'Por favor, informe seu telefone ou WhatsApp.',
  email: 'Por favor, informe um e-mail válido.',
  atendimento: 'Por favor, selecione o tipo de atendimento.',
  mensagem: 'Por favor, conte brevemente como podemos ajudar.',
};

export function ContactForm() {
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [service, setService] = useState('');
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const servicePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeServiceMenu = (event: PointerEvent) => {
      if (!servicePickerRef.current?.contains(event.target as Node)) setServiceMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeServiceMenu);
    return () => document.removeEventListener('pointerdown', closeServiceMenu);
  }, []);

  const validate = (event: InvalidEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.currentTarget;
    let text = messages[field.name];
    if (!field.validity.valueMissing && field.name === 'nome') text = 'O nome deve ter pelo menos 3 caracteres.';
    if (!field.validity.valueMissing && field.name === 'telefone') text = 'Informe um telefone válido com DDD.';
    field.setCustomValidity(text);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 2) return numbers ? `(${numbers}` : '';
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!service) {
      setServiceError(true);
      setServiceMenuOpen(true);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const message = [
      'Olá, Dra. Geanne! Vim pelo site e gostaria de conversar.',
      '',
      '*Nome:* ' + formData.get('nome'),
      '*Telefone:* ' + formData.get('telefone'),
      '*E-mail:* ' + formData.get('email'),
      '*Atendimento:* ' + formData.get('atendimento'),
      '*Mensagem:* ' + formData.get('mensagem'),
    ].join('\n');

    window.open(`https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Nome completo<input className="mt-2 block w-full border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required type="text" name="nome" minLength={3} maxLength={80} autoComplete="name" placeholder="Como podemos te chamar?" onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Telefone / WhatsApp<input className="mt-2 block w-full border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required type="tel" name="telefone" inputMode="numeric" autoComplete="tel" minLength={14} maxLength={15} value={phone} placeholder="(00) 00000-0000" onChange={(event) => setPhone(formatPhone(event.target.value))} onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Seu e-mail<input className="mt-2 block w-full border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required type="email" name="email" minLength={5} maxLength={120} autoComplete="email" placeholder="voce@email.com" onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <div ref={servicePickerRef} className="relative text-[11px] font-bold tracking-[1px] text-[#0A2723]">
        <span>Qual atendimento você procura?</span>
        <input type="hidden" name="atendimento" value={service} />
        <button type="button" aria-haspopup="listbox" aria-expanded={serviceMenuOpen} className={`mt-2 flex w-full cursor-pointer items-center justify-between border-0 border-b bg-transparent px-0 py-3.25 text-left text-[15px] font-normal tracking-normal outline-none transition ${serviceError ? 'border-[#b54c44]' : 'border-[#0A272359] hover:border-[#D1AD7D] focus:border-[#D1AD7D]'}`} onClick={() => setServiceMenuOpen((open) => !open)}>
          <span className={service ? 'text-[#0A2723]' : 'text-[#65706D]'}>{service || 'Selecione uma opção'}</span>
          <ChevronDown size={18} className={`shrink-0 text-[#0A2723] transition-transform ${serviceMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        <div role="listbox" aria-label="Tipo de atendimento" aria-hidden={!serviceMenuOpen} className={`absolute z-20 mt-2 w-full origin-top overflow-hidden rounded-lg border border-[#D1AD7D] bg-[#fffdf9] p-1.5 shadow-[0_14px_28px_rgba(10,39,35,.14)] transition-[opacity,transform] duration-200 ease-out ${serviceMenuOpen ? 'translate-y-0 scale-y-100 opacity-100' : '-translate-y-1 scale-y-95 opacity-0 pointer-events-none'}`}>
          {contactServiceOptions.map((option) => (
            <button key={option} type="button" role="option" aria-selected={service === option} className={`flex w-full cursor-pointer rounded-md px-3 py-3 text-left text-[14px] font-medium tracking-normal transition ${service === option ? 'bg-[#0A2723] text-white' : 'text-[#0A2723] hover:bg-[#E0C8A073]'}`} onClick={() => { setService(option); setServiceError(false); setServiceMenuOpen(false); }}>
              {option}
            </button>
          ))}
        </div>
        {serviceError && <span className="mt-2 block text-[11px] font-medium tracking-normal text-[#b54c44]">Selecione o tipo de atendimento para continuar.</span>}
      </div>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Como podemos ajudar?<textarea className="mt-2 block h-29.5 w-full resize-none border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required name="mensagem" rows={3} maxLength={500} value={message} placeholder="Conte brevemente sobre sua necessidade." onChange={(event) => setMessage(event.target.value)} onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /><span className="mt-1.75 block text-right text-[10px] font-medium tracking-[.2px] text-[#65706D]">{message.length}/500 caracteres</span></label>
      <button className="self-start cursor-pointer rounded-lg bg-[#0A2723] px-5.25 py-3.75 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123A34] disabled:cursor-default" type="submit" disabled={sent}>{sent ? 'Mensagem enviada ✓' : <>Enviar mensagem <span className="ml-5">→</span></>}</button>
      <p className={`${sent ? 'animate-[fade-quote_.35s_ease] block' : 'hidden'} m-0 border-l-[3px] border-[#268b53] bg-[#F3F3F3a6] px-3.75 py-3.25 text-[13px] font-semibold leading-normal text-[#0A2723]`} role="status">O WhatsApp foi aberto com sua mensagem preenchida. Basta conferir e enviar.</p>
    </form>
  );
}

'use client';

import { FormEvent, InvalidEvent, useState } from 'react';

const messages: Record<string, string> = {
  nome: 'Por favor, informe seu nome completo.',
  telefone: 'Por favor, informe seu telefone ou WhatsApp.',
  email: 'Por favor, informe um e-mail válido.',
  mensagem: 'Por favor, conte brevemente como podemos ajudar.',
};

export function ContactForm() {
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const validate = (event: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    setSent(true);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Nome completo<input className="mt-2 block w-full border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required type="text" name="nome" minLength={3} maxLength={80} autoComplete="name" placeholder="Como podemos te chamar?" onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Telefone / WhatsApp<input className="mt-2 block w-full border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required type="tel" name="telefone" inputMode="numeric" autoComplete="tel" pattern="\\([0-9]{2}\\)\\s?[0-9]{4,5}-[0-9]{4}" maxLength={15} value={phone} placeholder="(00) 00000-0000" onChange={(event) => setPhone(formatPhone(event.target.value))} onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Seu e-mail<input className="mt-2 block w-full border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required type="email" name="email" minLength={5} maxLength={120} autoComplete="email" placeholder="voce@email.com" onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
      <label className="text-[11px] font-bold tracking-[1px] text-[#0A2723]">Como podemos ajudar?<textarea className="mt-2 block h-29.5 w-full resize-none border-0 border-b border-[#0A272359] bg-transparent py-3.25 text-[15px] outline-none focus:border-[#D1AD7D]" required name="mensagem" rows={3} maxLength={500} value={message} placeholder="Conte brevemente sobre sua necessidade." onChange={(event) => setMessage(event.target.value)} onInvalid={validate} onInput={(event) => event.currentTarget.setCustomValidity('')} /><span className="mt-1.75 block text-right text-[10px] font-medium tracking-[.2px] text-[#65706D]">{message.length}/500 caracteres</span></label>
      <button className="self-start rounded-lg bg-[#0A2723] px-5.25 py-3.75 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123A34] disabled:cursor-default" type="submit" disabled={sent}>{sent ? 'Mensagem enviada ✓' : <>Enviar mensagem <span className="ml-5">→</span></>}</button>
      <p className={`${sent ? 'animate-[fade-quote_.35s_ease] block' : 'hidden'} m-0 border-l-[3px] border-[#268b53] bg-[#F3F3F3a6] px-3.75 py-3.25 text-[13px] font-semibold leading-normal text-[#0A2723]`} role="status">Mensagem recebida! Obrigada pelo contato. Em breve retornaremos para você.</p>
    </form>
  );
}

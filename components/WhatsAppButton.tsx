'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HINT_DURATION = 4000;
const HINT_INTERVAL = 20000;

export function WhatsAppButton() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    let hideTimer: number | undefined;

    const revealHint = () => {
      setShowHint(true);

      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setShowHint(false), HINT_DURATION);
    };

    revealHint();
    const interval = window.setInterval(revealHint, HINT_INTERVAL);

    return () => {
      window.clearInterval(interval);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <Link
      href="https://wa.me/5500000000000?text=Ol%C3%A1%2C%20Dra.%20Geanne!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta."
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar uma consulta pelo WhatsApp"
      className="group fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-[max(16px,env(safe-area-inset-right))] z-20 grid h-13.5 w-13.5 place-items-center rounded-full border-[3px] border-[#D1AD7D] bg-[#0A2723] text-[26px] text-white shadow-[0_6px_18px_#10243b40,0_0_0_3px_#D1AD7D48] animate-[whatsapp-pulse_2s_ease-out_infinite] md:bottom-6 md:right-6.25 md:h-16 md:w-16"
    >
      <span
        aria-hidden="true"
        style={{ transform: 'translateY(-50%)' }}
        className={`pointer-events-none absolute right-[calc(100%+14px)] top-1/2 block whitespace-nowrap rounded-md bg-[#0A2723] px-3 py-2 text-[12px] font-semibold text-[#F6EECF] shadow-[0_8px_20px_rgba(10,39,35,0.18)] transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 ${showHint ? 'opacity-100' : 'opacity-0'}`}
      >
        Fale pelo WhatsApp
      </span>
      <Image src="/assets/Whataspp-icon.png" alt="Ícone do WhatsApp" width={40} height={40} />
    </Link>
  );
}

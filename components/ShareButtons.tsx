'use client';

import { Share2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type ShareButtonsProps = {
  title: string;
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-[#1877F2]">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.28-.12-2.44-.12-2.42 0-4.08 1.48-4.08 4.2v2.22H7.43V13h2.74v8h3.33Z" />
    </svg>
  );
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [feedback, setFeedback] = useState('');

  const getShareData = () => ({
    title,
    text: title,
    url: window.location.href,
  });

  const shareOnFacebook = () => {
    const { url } = getShareData();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnWhatsApp = () => {
    const { text, url } = getShareData();
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, '_blank', 'noopener,noreferrer');
  };

  const shareMore = async () => {
    const data = getShareData();

    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }

      await navigator.clipboard.writeText(data.url);
      setFeedback('Link copiado');
      window.setTimeout(() => setFeedback(''), 2200);
    } catch {
    }
  };

  const buttonClass = 'grid h-14 cursor-pointer place-items-center rounded-xl bg-[#0A272308] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0A272312] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D1AD7D]';

  return (
    <section className="mt-12 max-w-175 border-t border-[#D1AD7D55] pt-7" aria-label="Compartilhar artigo">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[12px] font-bold tracking-[1px] text-[#0A2723]">COMPARTILHE ESTE ARTIGO</p>
        <span className="text-[12px] font-semibold text-[#31514b]" aria-live="polite">{feedback}</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <button type="button" onClick={shareOnFacebook} className={buttonClass} aria-label="Compartilhar no Facebook" title="Compartilhar no Facebook"><FacebookIcon /></button>
        <button type="button" onClick={shareOnWhatsApp} className={buttonClass} aria-label="Compartilhar no WhatsApp" title="Compartilhar no WhatsApp">
          <Image
            src="/assets/Whatsapp-Icon-blog.png"
            alt='Icone Whatsapp colorido'
            width={38}
            height={38}

          />
        </button>
        <button type="button" onClick={shareMore} className={buttonClass} aria-label="Mais opções de compartilhamento" title="Mais opções de compartilhamento"><Share2 className="h-7 w-7 text-[#5B6268]" strokeWidth={2.25} /></button>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { WhatsAppButton } from '../components/WhatsAppButton';

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[#F3F3F3] text-[#0A2723]">
      <header className="flex items-center justify-between border-b border-[#D1AD7D33] px-5.5 py-5 md:px-[max(6vw,40px)] md:py-6">
        <Link href="/" aria-label="Voltar ao in&iacute;cio">
          <Image
            src="/assets/Logo-dra.png"
            alt="Logo da Dra. Geanne Lopes"
            width={260}
            height={70}
            priority
            sizes="(max-width: 767px) 200px, 260px"
            className="h-auto w-50 xl:w-65"
          />
        </Link>
        <Link href="/blog" className="text-[13px] font-semibold transition hover:text-[#D1AD7D] md:text-[14px]">
          Ir para o Blog &rarr;
        </Link>
      </header>

      <section className="relative isolate flex flex-1 items-center px-5.5 py-18 md:px-[max(6vw,40px)] md:py-25">
        <div className="pointer-events-none absolute -right-35 -top-55 -z-10 h-150 w-150 rounded-full border border-[#D1AD7D55] bg-[#D1AD7D12]" />
        <div className="pointer-events-none absolute -bottom-55 -left-35 -z-10 h-110 w-110 rounded-full bg-[#0A272308]" />
        <div className="mx-auto w-full max-w-210 text-center">
          <p className="mb-4 text-[11px] font-semibold tracking-[1.8px] text-[#D1AD7D]">ERRO 404</p>
          <h1 className="font-['Playfair_Display'] text-[clamp(44px,7vw,88px)] leading-[.98] tracking-[-2px]">
            Esta p&aacute;gina n&atilde;o foi encontrada.
          </h1>
          <p className="mx-auto mt-6 max-w-135 text-[16px] leading-[1.7] text-[#52605c] md:text-[18px]">
            O endere&ccedil;o pode estar incorreto ou o conte&uacute;do pode ter sido movido. Vamos te levar para o lugar certo.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="inline-flex min-h-13 items-center justify-center rounded-lg bg-[#0A2723] px-6 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123A34]">
              Voltar ao in&iacute;cio
            </Link>
            <Link href="/blog" className="inline-flex min-h-13 items-center justify-center rounded-lg border border-[#0A2723] px-6 text-[15px] font-semibold transition hover:bg-[#0A2723] hover:text-white">
              Ver conte&uacute;dos
            </Link>
          </div>
        </div>
      </section>
      <WhatsAppButton />
    </main>
  );
}

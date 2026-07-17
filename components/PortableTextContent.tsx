import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '../sanity/lib/image';

type RichTextImage = {
  asset?: unknown;
  alt?: string;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-11 font-['Playfair_Display'] text-[32px] leading-[1.14] text-[#0A2723] md:text-[40px]">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-9 font-['Playfair_Display'] text-[26px] leading-[1.2] text-[#0A2723] md:text-[32px]">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-3 mt-8 text-[20px] font-bold leading-[1.3] text-[#0A2723] md:text-[23px]">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="my-8 border-l-2 border-[#D1AD7D] py-1 pl-5 font-['Playfair_Display'] text-[22px] italic leading-normal text-[#31514b]">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 ml-6 list-disc space-y-2 marker:text-[#D1AD7D]">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-[#D1AD7D]">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      const external = href.startsWith('http');

      return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="font-semibold text-[#31514b] underline decoration-[#D1AD7D] decoration-1 underline-offset-4 transition-colors hover:text-[#0A2723]">{children}</a>;
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as RichTextImage;
      if (!image?.asset) return null;

      return (
        <figure className="my-10">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image src={urlFor(value as SanityImageSource).width(1400).height(788).fit('crop').url()} alt={image.alt ?? ''} fill sizes="(max-width: 900px) 100vw, 900px" className="object-cover" />
          </div>
        </figure>
      );
    },
  },
};

export function PortableTextContent({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;

  return <PortableText value={value} components={portableTextComponents} />;
}

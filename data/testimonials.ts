export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: '“A Dra. Geanne conduziu todo o processo com muita clareza e acolhimento. Em cada etapa, eu sabia exatamente o que estava acontecendo.”',
    name: 'Mariana R.',
    role: 'Cliente',
  },
  {
    quote: '“Tive segurança desde a primeira conversa. O atendimento foi muito humano, objetivo e sempre respeitoso com a minha história.”',
    name: 'Carolina M.',
    role: 'Cliente',
  },
  {
    quote: '“Profissional extremamente atenta aos detalhes. Recebi a orientação que precisava para tomar uma decisão importante com tranquilidade.”',
    name: 'Fernanda L.',
    role: 'Cliente',
  },
];

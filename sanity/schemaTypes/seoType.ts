import { defineField, defineType } from 'sanity';

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título para Google e compartilhamento',
      description: 'Opcional. Se vazio, será utilizado o título do artigo.',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('O ideal é manter até 60 caracteres.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrição para Google e compartilhamento',
      description: 'Opcional. Se vazio, será utilizado o resumo do artigo.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('O ideal é manter até 160 caracteres.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagem para compartilhamento',
      description: 'Opcional. Recomendado: 1200 × 630 pixels. Se vazio, será usada a imagem de capa.',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
    }),
    defineField({
      name: 'noIndex',
      title: 'Ocultar este artigo do Google',
      description: 'Use apenas para rascunhos ou conteúdos que não devem aparecer nas buscas.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

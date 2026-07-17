import {defineType, defineArrayMember} from 'sanity'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Conteúdo rico',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Parágrafo', value: 'normal'},
        {title: 'Título 2', value: 'h2'},
        {title: 'Título 3', value: 'h3'},
        {title: 'Título 4', value: 'h4'},
        {title: 'Citação', value: 'blockquote'},
      ],
      lists: [
        {title: 'Lista com marcadores', value: 'bullet'},
        {title: 'Lista numerada', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Negrito', value: 'strong'},
          {title: 'Itálico', value: 'em'},
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }
      ]
    }),
  ],
})

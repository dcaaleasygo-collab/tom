import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'text' },
            { name: 'images', type: 'upload', relationTo: 'media' },
          ],
        },
        {
  slug: 'content_header',
  fields: [
    {
      name: 'body',
      type: 'blocks',
      blocks: [
        { slug: 'text', fields: [{ name: 'value', type: 'text' }] },
        { slug: 'gif', fields: [{ name: 'file', type: 'upload', relationTo: 'media' }] },
        {
          slug: 'image_center', // NUEVO
          fields: [
            { name: 'file', type: 'upload', relationTo: 'media' },
            {
              name: 'position',
              type: 'select',
              label: 'Posición vertical',
              options: [
                { label: 'Arriba', value: 'top' },
                { label: 'Centro', value: 'center' },
                { label: 'Abajo', value: 'bottom' }
              ],
              defaultValue: 'center'
            }
          ]
        }
      ]
    },
    { name: 'images', type: 'upload', relationTo: 'media' }
  ]
}
  
,
        {
          slug: 'content_Body',
          fields: [
            {
              name: 'body',
              type: 'blocks',
              blocks: [
                {
                  slug: 'text',
                  fields: [
                    { name: 'value', type: 'text' },
                  ],
                },
                {
                  slug: 'gif',
                  fields: [
                    { name: 'file', type: 'upload', relationTo: 'media' },
                  ],
                },
                {
                  slug: 'image',
                  fields: [
                    { name: 'file', type: 'upload', relationTo: 'media' },
                  ],
                },
              ],
            },
          ],
        },
        {
          slug: 'image_section',
          labels: { singular: 'Sección de Imagen', plural: 'Secciones de Imagen' },
          fields: [
            {
              name: 'position',
              type: 'select',
              options: [
                { label: 'Arriba', value: 'top' },
                { label: 'Centro', value: 'center' },
                { label: 'Abajo', value: 'bottom' },
              ],
              defaultValue: 'center',
            },
            {
              name: 'body',
              type: 'array',
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

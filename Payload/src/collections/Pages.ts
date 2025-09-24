// src/collections/Pages.ts
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
          ],
        },
        {
          slug: 'content',
          fields: [
            { name: 'body', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}

// src/collections/Pages.ts
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {  
  slug: 'pages',
  access: {
    read: () => true, // 👈 hace público el GET
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
            {name: 'images', type:'upload', relationTo: 'media'},
          ],
        },
        {
          slug: 'content_header',
          fields: [
            {name: 'body', type: 'array', fields:[{name: 'Text', type:'text'}]},
            {name: 'images', type:'upload', relationTo: 'media'},
            {name: 'gifs', type: 'array', fields:[{name: 'Gif', type:'upload', relationTo:'media'}]}
          ],
        },
        {
          slug: 'content_Body',
          fields: [
            {name: 'body', type: 'array', fields:[{name: 'Text', type:'text'}]},
            {name: 'images', type: 'array', fields:[{name: 'Images', type:'upload', relationTo:'media'}]},
            {name: 'gifs', type: 'array', fields:[{name: 'Gif', type:'upload', relationTo:'media'}]}
          ],
        },
      ],
    },
  ],
}

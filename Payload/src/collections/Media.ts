import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'image/gif'],
    imageSizes: [
      {
        name: 'small',
        width: 200,
        height: 200,
      },
      {
        name: 'medium',
        width: 500,
        height: 500,
      },
      {
        name: 'large',
        width: 1000,
        height: 1000,
      },
      {
        name: 'custom250',
        width: 250,
        height: 40,
        fit: 'cover',
      },
    ],
    adminThumbnail: 'small',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'size',
      type: 'select',
      label: 'Tamaño de imagen',
      options: [
        { label: 'Pequeño (200x200)', value: 'small' },
        { label: 'Mediano (500x500)', value: 'medium' },
        { label: 'Grande (1000x1000)', value: 'large' },
        { label: 'Custom (250x40)', value: 'custom250' },
      ],
      required: true,
      defaultValue: 'medium',
    },
  ],
}

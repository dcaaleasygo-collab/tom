import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media', // Carpeta donde se guardan los archivos
    mimeTypes: ['image/*', 'image/gif'], // Opcional: restringir a imágenes/GIFs
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
    ],
    adminThumbnail: 'small', // Muestra el tamaño small en el admin
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}

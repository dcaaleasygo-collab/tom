// src/payload/globals/Footer.ts
import { GlobalConfig } from "payload"

const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Dirección',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
      required: true,
    },
    {
      name: 'privacyPolicy',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Políticas de Privacidad',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Redes Sociales',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  access: {
    read: (): boolean => true,
  },
}

export default Footer

import { GlobalConfig } from "payload"

const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',

      
    },
    {
      name: 'menu',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: false },
      ],
    },
  ],
  access:{
    read: (): boolean => true
  },
}

export default Header

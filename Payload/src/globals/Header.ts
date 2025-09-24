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
        { name: 'url', type: 'text', required: true },
      ],
    },{name: 'Boton-Derecho',
      type: 'group',
      fields: [
        { name: 'Text', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: "logo_", type: 'upload',relationTo: 'media' }, 
    ]}],
  access:{
    read: (): boolean => true
  },
}
export default Header

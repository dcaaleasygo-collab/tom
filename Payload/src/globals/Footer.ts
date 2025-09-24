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
  name: "footerSections",
  type: "array",
  label: "Secciones del Footer",
  fields: [
    { name: "logo", type: 'upload',relationTo: 'media' }, 
    { name: "content", type: "text" },
    { name: "url", type: "text" }
  ]
},
    {
      name: 'socials',
      type: 'array',
      label: 'Social Media',
      fields: [
            { name:'url',type: 'text' },
            {name: 'logo', type: 'upload',relationTo: 'media'}
      ],
    },
  ],
  access: {
    read: (): boolean => true,
  },
}
export default Footer
